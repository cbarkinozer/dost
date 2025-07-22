from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from app.schemas.chat import ChatRequest # <-- This import now works
from app.services.llm_client import get_chat_response_stream

router = APIRouter()

@router.post("/chat")
async def handle_chat_request(chat_request: ChatRequest): # <-- FastAPI uses this for validation
    """
    Handles a chat request by streaming the response from the LLM.
    """
    stream_generator = get_chat_response_stream(chat_request)
    return StreamingResponse(stream_generator, media_type="text/event-stream")