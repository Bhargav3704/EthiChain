from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
import google.generativeai as genai
from dotenv import load_dotenv
import os
import uvicorn

# Load environment variables
load_dotenv()

# Initialize FastAPI app
app = FastAPI()

# Enable CORS (Allow React frontend to talk to FastAPI backend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Change this to your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static directory to serve images, CSS, JS
app.mount("/static", StaticFiles(directory="static"), name="static")

# Serve index.html
@app.get("/")
def read_root():
    return FileResponse("index.html")

# Redirects
@app.get("/producer")
def go_to_producer():
    return RedirectResponse(url="http://localhost:5181")  # Update if needed

@app.get("/consumer")
def go_to_consumer():
    return RedirectResponse(url="http://localhost:5173")  # Update if needed

# Configure Gemini API
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY is not set. Please check your .env file.")

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
        "Imagine yourself as a chatbot whose main aim is to give awareness to people about "
        f"greenwashing and sustainability practices. For this question: '{question}', "
        "give professional and factual answers. If the user asks an unrelated question, respond with: "
        "'I only provide information on greenwashing and sustainability.' "
        "Provide responses in about 30 words."
    )
    response = ask_gemini(prompt)
    return {"response": response}

# Run the FastAPI application
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
