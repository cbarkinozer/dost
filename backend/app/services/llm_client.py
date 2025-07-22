from openai import AsyncOpenAI
from groq import AsyncGroq
from app.config import settings
from app.schemas.chat import ChatRequest

# --- Client Initialization ---

# Client for generic OpenAI-compatible services (like Ollama)
openai_client = AsyncOpenAI(
    base_url=settings.LLM_API_BASE_URL,
    api_key=settings.LLM_API_KEY,
)

# Client for Groq services
# The Groq SDK will automatically handle the base URL.
groq_client = AsyncGroq(
    api_key=settings.GROQ_API_KEY,
)

# --- Model to Client Mapping ---

# A simple way to route requests to the correct client.
# The keys are the exact model names the frontend will send.
# You can find the available Groq model names in their documentation.
GROQ_MODELS = {
    "llama3-8b-8192",
    "llama3-70b-8192",
    "mixtral-8x7b-32768",
    "gemma-7b-it",
}

def get_client_for_model(model_name: str):
    """
    Selects the appropriate client based on the model name.
    """
    if model_name in GROQ_MODELS:
        print(f"Using Groq client for model: {model_name}")
        return groq_client
    else:
        print(f"Using generic OpenAI client for model: {model_name}")
        return openai_client

# --- Core Service Logic ---

async def get_chat_response_stream(chat_request: ChatRequest):
    """
    Selects the correct client and makes a streaming request to the API.

    Yields chunks of the response as they are received.
    """
    # 1. Select the appropriate client
    client = get_client_for_model(chat_request.model)

    # 2. Convert Pydantic models to dictionaries for the API call
    messages_as_dicts = [msg.model_dump() for msg in chat_request.messages]

    # 3. Make the streaming API call
    stream = await client.chat.completions.create(
        model=chat_request.model,
        messages=messages_as_dicts,
        stream=True,
    )

    # 4. Yield the content from each chunk
    async for chunk in stream:
        content = chunk.choices[0].delta.content
        if content:
            yield content