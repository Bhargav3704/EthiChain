from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import time

def get_ecocert_search_results(organization_name):
    # ✅ Set up WebDriver
    service = Service(ChromeDriverManager().install())
    options = webdriver.ChromeOptions()
    options.add_argument("--ignore-certificate-errors")
    options.add_argument("--allow-insecure-localhost")
    options.add_argument("--disable-web-security")
    options.add_argument("--ignore-ssl-errors=yes")
    options.add_argument("--start-maximized")
    
    driver = webdriver.Chrome(service=service, options=options)

    results_list = []  # List to store extracted results

    try:
        # ✅ Open the ECOCERT directory
        url = "https://certificat.ecocert.com/"
        driver.get(url)

        # ✅ Wait for the search box & enter the company name
        search_box = WebDriverWait(driver, 15).until(
            EC.presence_of_element_located((By.XPATH, "//input[@placeholder='Enter the company name...']"))
        )
        search_box.clear()
        search_box.send_keys(organization_name)
        search_box.send_keys(Keys.RETURN)

        # ✅ Wait for search results to appear
        WebDriverWait(driver, 15).until(
            EC.presence_of_element_located((By.CLASS_NAME, "results"))
        )
        time.sleep(5)

        # ✅ Check if "No results found" message appears
        try:
            no_results = driver.find_element(By.XPATH, "//p[contains(text(), 'No results')]")
            driver.quit()
            return []
        except:
            pass

        # ✅ Extract all company cards
        company_cards = driver.find_elements(By.CLASS_NAME, "item.d-flex.flex-column.justify-space-between")
        
        for card in company_cards:
            company_info = {}
            
            company_info["Company"] = card.find_element(By.TAG_NAME, "h2").text.strip()
            
            try:
                company_info["Address"] = card.find_element(By.CLASS_NAME, "address").text.strip().split("\n")[0]  # Remove extra text
            except:
                company_info["Address"] = "Not available"
            
            try:
                company_info["Activities"] = card.find_element(By.CLASS_NAME, "activities").text.strip().replace("Activities :", "").strip()
            except:
                company_info["Activities"] = "Not available"
            
            try:
                product_section = card.find_element(By.CLASS_NAME, "productCategories")
                company_info["Product Categories"] = [prod.text.strip() for prod in product_section.find_elements(By.TAG_NAME, "span")]
            except:
                company_info["Product Categories"] = ["No product categories found"]
            
            results_list.append(company_info)

    except Exception as e:
        pass
    finally:
        driver.quit()

    return results_list
