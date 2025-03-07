from fastapi import FastAPI, HTTPException
import google.generativeai as genai
from dotenv import load_dotenv
import os
import uvicorn  # Import uvicorn to run the server

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI()

# Retrieve API Key from environment variables
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY is not set. Please check your .env file.")

# Configure Google Generative AI
genai.configure(api_key=GEMINI_API_KEY)

def ask_gemini(question: str) -> str:
    """Queries Gemini API with a given question and returns response text."""
    try:
        model = genai.GenerativeModel("gemini-1.5-pro")
        response = model.generate_content(question)
        return response.text
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error in Gemini API: {str(e)}")

@app.get("/chat")
async def chat(question: str):
    prompt = (
        f"Imagine yourself as a chatbot whose main aim is to give awareness to people about "
        f"greenwashing and sustainability practices. For this question: '{question}', "
        f"give professional and factual answers. If the user asks an unrelated question, respond with: "
        f"'I only provide information on greenwashing and sustainability.'"
        f"'Give me responses in about 60 words"
    )
    response = ask_gemini(prompt)
    return {"response": response}

# Run the FastAPI application
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
