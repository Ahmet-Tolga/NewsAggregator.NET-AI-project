from constants.stop_words import stop_words

import re

def preprocess_text(text):
        text = text.lower()
        text = re.sub(r'[^\w\s]', '', text)
        words = [word for word in text.split() 
                if word not in stop_words and len(word) > 2]
        return ' '.join(words)