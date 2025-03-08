from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import time

def get_iscc_certificate_details(organization_name):
    # ✅ Set up WebDriver
    service = Service(ChromeDriverManager().install())
    options = webdriver.ChromeOptions()

    # ✅ Bypass SSL Errors & Maximize Window
    options.add_argument("--ignore-certificate-errors")
    options.add_argument("--allow-insecure-localhost")
    options.add_argument("--disable-web-security")
    options.add_argument("--ignore-ssl-errors=yes")
    options.add_argument("--start-maximized")

    driver = webdriver.Chrome(service=service, options=options)

    try:
        # ✅ Step 1: Open the ISCC certification directory
        url = "https://www.iscc-system.org/certificates/all-certificates/"
        driver.get(url)

        # ✅ Step 2: Wait for the search box and enter the company name
        search_box = WebDriverWait(driver, 15).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "input.form-control"))
        )

        search_box.click()
        search_box.clear()

        # ✅ Type text character by character (Mimic human typing)
        for char in organization_name:
            search_box.send_keys(char)
            time.sleep(0.1)  # Simulate human delay

        # ✅ Manually trigger the JavaScript search event
        driver.execute_script("arguments[0].dispatchEvent(new Event('input', { bubbles: true }));", search_box)

        time.sleep(5)  # Allow search results to update

        # ✅ Step 3: Check if "No matching records found" message appears
        try:
            no_results = driver.find_element(By.XPATH, "//table[@id='table_1']/tbody/tr/td").text
            if "No matching records found" in no_results:
                print(f"❌ No results found for '{organization_name}'.")
                driver.quit()
                return []
        except:
            pass  # Continue if no such message is found

        # ✅ Step 4: Extract certificate details from the table
        table_rows = WebDriverWait(driver, 10).until(
            EC.presence_of_all_elements_located((By.XPATH, "//table[@id='table_1']/tbody/tr"))
        )

        results = []
        for row in table_rows:
            columns = row.find_elements(By.TAG_NAME, "td")

            # ✅ Extract required fields
            certificate_id = columns[1].text.strip() if len(columns) > 1 else "N/A"
            certificate_holder = columns[2].text.strip() if len(columns) > 2 else "N/A"
            products = columns[6].text.strip() if len(columns) > 6 else "N/A"
            valid_from = columns[7].text.strip() if len(columns) > 7 else "N/A"
            valid_until = columns[8].text.strip() if len(columns) > 8 else "N/A"
            suspension_status = columns[9].text.strip() if len(columns) > 9 else "Not Suspended"

            # ✅ Store result as a dictionary
            results.append({
                "Certificate ID": certificate_id,
                "Certificate Holder": certificate_holder,
                "Products": products,
                "Valid From": valid_from,
                "Valid Until": valid_until,
                "Suspension Status": suspension_status
            })

        driver.quit()

        # ✅ Return results as a list of dictionaries
        return results

    except Exception as e:
        print(f"🚨 Error: {str(e)}")
        result = []

    finally:
        driver.quit()

    return result

