from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import time

def get_sa8000_certificate_status(company_name):
    # ✅ Setup WebDriver
    service = Service(ChromeDriverManager().install())
    options = webdriver.ChromeOptions()
    options.add_argument("--headless")  # Run Chrome in headless mode
    options.add_argument("--start-maximized")
    
    driver = webdriver.Chrome(service=service, options=options)
    
    try:
        # ✅ Open the SA8000 Search Page
        url = "https://sa-intl.org/sa8000-search/#"
        driver.get(url)
        
        # ✅ Allow the page to load completely
        time.sleep(5)

        # ✅ Locate the Search Box and Enter Company Name
        search_box = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "//input[@type='search']"))
        )
        search_box.send_keys(company_name)
        search_box.send_keys(Keys.RETURN)

        # ✅ Wait for search results to load
        time.sleep(5)  # Adjust if needed

        # ✅ Locate and Extract Certificate ID & Status
        certificate_data = []
        rows = driver.find_elements(By.XPATH, "//table[@id='example']/tbody/tr")

        for row in rows:
            columns = row.find_elements(By.TAG_NAME, "td")
            if len(columns) >= 3:  # Ensure columns exist
                certificate_id = columns[0].text.strip()
                certificate_status = columns[2].text.strip()
                certificate_data.append((certificate_id, certificate_status))
        
        return certificate_data

    except Exception as e:
        print(f"Error: {e}")
        return None

    finally:
        driver.quit()


# Example Usage
company = "XYZ Company"  # Replace with actual company name
certificates = get_sa8000_certificate_status(company)

if certificates:
    for cert_id, status in certificates:
        print(f"Certificate ID: {cert_id}, Status: {status}")
else:
    print("No certificates found.")
