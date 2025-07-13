from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
from utils.text_processor import preprocess_text

class NewsComparator:
    def __init__(self, model_name='paraphrase-multilingual-MiniLM-L12-v2'):
        self.model = SentenceTransformer(model_name)
    
    def _get_embeddings(self, texts):
        return self.model.encode(texts)
    
    def find_similar_news(self, target_title, news_list, threshold=0.5):
      
        processed_texts = [preprocess_text(target_title)] + \
                        [preprocess_text(news['title']+news["description"]) for news in news_list]
        
        embeddings = self._get_embeddings(processed_texts)

        similarities = cosine_similarity([embeddings[0]], embeddings[1:])[0]

        return [news for news, sim in zip(news_list, similarities) if sim >= threshold]