from typing import List
from pydantic import BaseModel

class NewsItem(BaseModel):
    title: str
    description: str
    imgUrl: str
    link: str
    pubDate:str
    source:str

class SimilarNewsRequest(BaseModel):
    target_title: str
    news_list: List[NewsItem]
    threshold: float = 0.5
