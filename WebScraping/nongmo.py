from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import time

def get_non_gmo_certification(organization_name):
    # ✅ Set up WebDriver
    service = Service(ChromeDriverManager().install())
    options = webdriver.ChromeOptions()
    options.add_argument("--headless")  # Run in background
    options.add_argument("--no-sandbox")  
    options.add_argument("--disable-dev-shm-usage")  
    driver = webdriver.Chrome(service=service, options=options)

    # ✅ Open the Non-GMO Project search page
    url = "https://www.nongmoproject.org/find-non-gmo/"
    driver.get(url)

    try:
        # ✅ Locate search box and enter the brand name
        search_box = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "//input[@class='keyword' and @placeholder='Keyword Search']"))
        )
        search_box.clear()
        search_box.send_keys(organization_name)
        search_box.send_keys(Keys.RETURN)

        # ✅ Wait for results to load
        time.sleep(5)

        # ✅ Locate and click the first matching organization
        results = driver.find_elements(By.XPATH, "//a[contains(@class, 'seeall')]")
        if not results:
            driver.quit()
            return
        
        driver.execute_script("arguments[0].scrollIntoView();", results[0])  
        time.sleep(2)  
        results[0].click()

        # ✅ Wait for the modal with product details
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CLASS_NAME, "brand"))
        )
        time.sleep(3)  

        # ✅ Extract product details
        products = driver.find_elements(By.XPATH, "//div[@class='products']/div")
        product_list = [product.text for product in products]

        # ✅ Print only product names
        for product in product_list:
            print(product)

    except Exception as e:
        pass  # Silence errors if any

    driver.quit()

