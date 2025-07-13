from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models.comparision_model  import NewsComparator
from models.gemini_model import GeminiModel
from dtos.SimilarNewsRequest import SimilarNewsRequest
from dtos.UserPromptRequest import UserPromptRequest
from constants.prompt import getPrompt
from services.jsonService import clean_and_parse_json_model_response
import os
from dotenv import load_dotenv

load_dotenv()

MODEL_NAME=os.getenv("MODEL_NAME")
API_KEY=os.getenv("API_KEY")

app = FastAPI()

comparator_model = NewsComparator()
gemini_model=GeminiModel(MODEL_NAME,API_KEY)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/find-similar")
async def find_similar_news(request: SimilarNewsRequest):
    similar_news = comparator_model.find_similar_news(
        request.target_title,
        [dict(item) for item in request.news_list],
        request.threshold
    )
    return {"similar_news": similar_news}

@app.post("/user_prompt")
async def get_ai_response(request: UserPromptRequest):
    try:
        full_prompt = getPrompt(request.prompt,request.data, request.conversation_history)

        print(full_prompt)
        ai_response = gemini_model.generate_response(full_prompt)
        return {"response": clean_and_parse_json_model_response(ai_response)}
    except Exception as e:
        return {"error": str(e)}
