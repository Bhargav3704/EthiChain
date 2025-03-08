import os
import pandas as pd

# Ensure the absolute path to the CSV file is used
file_path = os.path.join(os.path.dirname(__file__), "RA_Certificate_Holders_List - 07-03-2025(in).csv")

# Check if file exists before loading
if not os.path.exists(file_path):
    raise FileNotFoundError(f"CSV file not found at {file_path}")

# Load the CSV file with proper encoding
df = pd.read_csv(file_path, encoding="latin1")

# Cleaning column names by removing brackets and extra spaces
df.columns = df.columns.str.replace(r"[\[\]]", "", regex=True).str.strip()

def get_certificate_details(holder_name):
    result = df[df["certificateholder_name"].str.contains(holder_name, case=False, na=False)]
    
    if not result.empty:
        return result[["certificateholder_name", "crop", "license_number", "license_status"]].to_dict(orient='records')
    else:
        return []
