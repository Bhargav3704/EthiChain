from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
import uvicorn

# Importing web scraping functions from uploaded scripts
from WebScraping.ecocert import get_ecocert_search_results
from WebScraping.iscc import get_iscc_certificate_details
from WebScraping.nongmo import get_non_gmo_certification
from WebScraping.rainforect import get_certificate_details
from WebScraping.sai import get_sa8000_certificate_status
from WebScraping.Web import get_fssc22000_certificate_status

# Initialize FastAPI app
app = FastAPI(title="Certification Search API", description="API to fetch various sustainability & food safety certifications")

# Define request model
class OrgRequest(BaseModel):
    organization_name: str

# ✅ Endpoint: ECOCERT Search
@app.post("/certifications/ecocert")
def fetch_ecocert_certifications(request: OrgRequest):
    try:
        results = get_ecocert_search_results(request.organization_name)
        if not results:
            return {"message": "No ECOCERT certification found"}
        return {"certifications": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ✅ Endpoint: ISCC Certification
@app.post("/certifications/iscc")
def fetch_iscc_certifications(request: OrgRequest):
    try:
        results = get_iscc_certificate_details(request.organization_name)
        if not results:
            return {"message": "No ISCC certification found"}
        return {"certifications": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ✅ Endpoint: Non-GMO Certification
@app.post("/certifications/nongmo")
def fetch_non_gmo_certifications(request: OrgRequest):
    try:
        results = get_non_gmo_certification(request.organization_name)
        if not results:
            return {"message": "No Non-GMO certification found"}
        return {"certifications": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ✅ Endpoint: Rainforest Alliance Certification
@app.post("/certifications/rainforest")
def fetch_rainforest_certifications(request: OrgRequest):
    try:
        results = get_certificate_details(request.organization_name)
        if not results:
            return {"message": "No Rainforest Alliance certification found"}
        return {"certifications": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ✅ Endpoint: SA8000 Certification (Social Accountability)
@app.post("/certifications/sa8000")
def fetch_sa8000_certifications(request: OrgRequest):
    try:
        results = get_sa8000_certificate_status(request.organization_name)
        if not results:
            return {"message": "No SA8000 certification found"}
        return {"certifications": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ✅ Endpoint: FSSC 22000 Certification (Food Safety)
@app.post("/certifications/fssc22000")
def fetch_fssc22000_certifications(request: OrgRequest):
    try:
        results = get_fssc22000_certificate_status(request.organization_name)
        if not results:
            return {"message": "No FSSC 22000 certification found"}
        return {"certifications": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ✅ Run the FastAPI server (if executing directly)
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)