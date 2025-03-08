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
            EC.presence_of_element_located((By.XPATH, "//input[@type='text' and contains(@class, 'nodrop')]")
        ))  # Fixed missing closing parenthesis
        search_box.clear()  # Ensure it's empty
        search_box.send_keys(organization_name)
        search_box.send_keys(Keys.RETURN)
    except Exception as e:
        driver.quit()
        return []

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

                if organization_name.lower() in org_name.lower():
                    results.append({
                        "Organization Name": org_name,
                        "Certificate ID": cert_id,
                        "Status": status,
                        "Certifying Body": cert_body
                    })
    except Exception as e:
        results = []

    driver.quit()
    return results
