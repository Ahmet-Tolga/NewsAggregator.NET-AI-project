import json

def clean_and_parse_json_model_response(response_text: str):
    if response_text.startswith("```json"):
        response_text = response_text.replace("```json", "").replace("```", "").strip()
    try:
        return json.loads(response_text)
    except json.JSONDecodeError as e:
        print("JSON parse hatası:", e)
        return {"error": "Geçersiz JSON"}
