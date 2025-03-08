from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import time

def get_fssc22000_certificate_status(organization_name):
    # ✅ Set up WebDriver
    service = Service(ChromeDriverManager().install())
    options = webdriver.ChromeOptions()
    options.add_argument("--headless")  # Run in background
    driver = webdriver.Chrome(service=service, options=options)

    # ✅ Open the FSSC 22000 certification website
    url = "https://www.fssc.com/public-register"  # Replace with actual URL
    driver.get(url)

    time.sleep(5)  # Allow JavaScript to load

    # ✅ Locate the search box and enter the organization name
    try:
        search_box = driver.find_element(By.CLASS_NAME, "results-filter__search-results")
        search_box.clear()
        search_box.send_keys(organization_name)
        search_box.send_keys(Keys.RETURN)
    except Exception as e:
        driver.quit()
        return []

    time.sleep(5)  # Wait for results to update

    # ✅ Extract all table rows
    try:
        rows = driver.find_elements(By.XPATH, "//table/tbody/tr")
        results = []
        for row in rows:
            columns = row.find_elements(By.TAG_NAME, "td")
            if len(columns) >= 4:
                org_name = columns[0].text.strip()
                location = columns[1].text.strip()
                scheme = columns[2].text.strip()
                certificate_status = columns[3].text.strip()

                # ✅ Store extracted details in list format
                if organization_name.lower() in org_name.lower() and scheme == "FSSC 22000":
                    results.append({
                        "Organization Name": org_name,
                        "Location": location,
                        "Scheme": scheme,
                        "Certificate Status": certificate_status
                    })
    except Exception as e:
        results = []

    driver.quit()
    return results
