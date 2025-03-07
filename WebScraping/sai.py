from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import time

def get_sa8000_certificate_status(organization_name):
    # ✅ Set up WebDriver
    service = Service(ChromeDriverManager().install())
    options = webdriver.ChromeOptions()
    options.add_argument("--start-maximized")  # Open full-screen
    driver = webdriver.Chrome(service=service, options=options)

    # ✅ Open the SA8000 certification website
    url = "https://sa-intl.org/sa8000-search/#"  
    driver.get(url)

    # ✅ Wait for input field to appear
    try:
        search_box = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "//input[@type='text' and contains(@class, 'nodrop')]"))
        )
        search_box.clear()  # Ensure it's empty
        search_box.send_keys(organization_name)
        search_box.send_keys(Keys.RETURN)

    except Exception as e:
        print("Error: Search box not found!", str(e))
        driver.quit()
        return "Search box not found"

    time.sleep(5)  # Wait for search results

    # ✅ Locate search results table
    try:
        results_table = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CLASS_NAME, "ui-sortable-tbody"))
        )
        rows = results_table.find_elements(By.CLASS_NAME, "pages")

        results = []
        for row in rows:
            columns = row.find_elements(By.TAG_NAME, "td")
            if len(columns) > 1:
                org_name = columns[0].text.strip()
                cert_id = columns[1].text.strip()
                status = columns[2].text.strip()
                cert_body = columns[3].text.strip()

                print(f"Found: {org_name} | Certificate ID: {cert_id} | Status: {status} | Certifying Body: {cert_body}")

                if organization_name.lower() in org_name.lower():
                    results.append(f"{org_name} - CertID: {cert_id}, Status: {status}, Body: {cert_body}")

    except Exception as e:
        print("No results found or issue loading results:", str(e))
        results = ["No valid SA8000 certificate found for this organization."]

    driver.quit()

    return "\n".join(results) if results else "No results found."

# ✅ Example Usage
org_input = input("Enter Organization Name: ")
status = get_sa8000_certificate_status(org_input)
print(status)
