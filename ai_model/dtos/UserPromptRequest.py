from pydantic import BaseModel
from typing import List, Dict

class UserPromptRequest(BaseModel):
    prompt: str
    data: str
    conversation_history: List[Dict[str, str]]
