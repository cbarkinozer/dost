from pydantic import BaseModel, Field
from typing import List

class ChatMessage(BaseModel):
    """
    Represents a single message in a conversation.
    """
    role: str = Field(..., description="The role of the message author, e.g., 'user' or 'assistant'.")
    content: str = Field(..., description="The text content of the message.")

class ChatRequest(BaseModel):
    """
    Represents the complete request payload for the /chat endpoint.
    """
    messages: List[ChatMessage] = Field(..., description="A list of messages forming the conversation history.")
    model: str = Field(..., description="The name of the model to use for the chat completion (e.g., 'llama3-70b-8192').")
    stream: bool = Field(True, description="Whether to stream the response back chunk by chunk.")