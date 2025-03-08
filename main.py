from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import google.generativeai as genai
import uvicorn
import os

# Load environment variables
from dotenv import load_dotenv
load_dotenv()

# Importing web scraping functions
from WebScraping.ecocert import get_ecocert_search_results
from WebScraping.iscc import get_iscc_certificate_details
from WebScraping.nongmo import get_non_gmo_certification
from WebScraping.rainforect import get_certificate_details
from WebScraping.sai import get_sa8000_certificate_status
from WebScraping.Web import get_fssc22000_certificate_status

# Initialize FastAPI app
app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static directory
app.mount("/static", StaticFiles(directory="static"), name="static")

# Serve index.html
@app.get("/")
def read_root():
    return FileResponse("index.html")

# Redirects
@app.get("/producer")
def go_to_producer():
    return RedirectResponse(url="http://localhost:5181")

@app.get("/consumer")
def go_to_consumer():
    return RedirectResponse(url="http://localhost:5173")

# Configure Gemini API
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY is not set. Please check your .env file.")

genai.configure(api_key=GEMINI_API_KEY)

def ask_gemini(question: str) -> str:
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

# Define request model
class OrgRequest(BaseModel):
    organization_name: str

# ✅ Certification Endpoints
@app.post("/certifications/ecocert")
def fetch_ecocert_certifications(request: OrgRequest):
    try:
        results = get_ecocert_search_results(request.organization_name)
        return {"certifications": results} if results else {"message": "No ECOCERT certification found"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/certifications/iscc")
def fetch_iscc_certifications(request: OrgRequest):
    try:
        results = get_iscc_certificate_details(request.organization_name)
        return {"certifications": results} if results else {"message": "No ISCC certification found"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/certifications/nongmo")
def fetch_non_gmo_certifications(request: OrgRequest):
    try:
        results = get_non_gmo_certification(request.organization_name)
        return {"certifications": results} if results else {"message": "No Non-GMO certification found"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/certifications/rainforest")
def fetch_rainforest_certifications(request: OrgRequest):
    try:
        results = get_certificate_details(request.organization_name)
        return {"certifications": results} if results else {"message": "No Rainforest Alliance certification found"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/certifications/sa8000")
def fetch_sa8000_certifications(request: OrgRequest):
    try:
        results = get_sa8000_certificate_status(request.organization_name)
        return {"certifications": results} if results else {"message": "No SA8000 certification found"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/certifications/fssc22000")
def fetch_fssc22000_certifications(request: OrgRequest):
    try:
        results = get_fssc22000_certificate_status(request.organization_name)
        return {"certifications": results} if results else {"message": "No FSSC 22000 certification found"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Run the FastAPI application
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)