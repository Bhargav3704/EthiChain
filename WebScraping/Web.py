from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from webdriver_manager.chrome import ChromeDriverManager
import time

def get_certificate_status(organization_name):
    # Automatically install and use ChromeDriver
    service = Service(ChromeDriverManager().install())
    options = webdriver.ChromeOptions()
    options.add_argument("--headless")  # Run in background
    driver = webdriver.Chrome(service=service, options=options)

    # Open the certification website
    url = "https://www.fssc.com/public-register"  # Replace with actual URL
    driver.get(url)

    time.sleep(5)  # Allow JavaScript to load

    # Locate the search box using class name and enter the organization name
    search_box = driver.find_element(By.CLASS_NAME, "results-filter__search-results")
    search_box.clear()  # Ensure it's empty
    search_box.send_keys(organization_name)
    search_box.send_keys(Keys.RETURN)

    time.sleep(5)  # Wait for results to update

    # Extract all table rows
    rows = driver.find_elements(By.XPATH, "//table/tbody/tr")

    results = []

    for row in rows:
        columns = row.find_elements(By.TAG_NAME, "td")
        if len(columns) >= 4:
            org_name = columns[0].text.strip()
            location = columns[1].text.strip()
            scheme = columns[2].text.strip()
            certificate_status = columns[3].text.strip()

            # Print extracted details for debugging
            print(f"Found: {org_name} | Location: {location} | Scheme: {scheme} | Status: {certificate_status}")

            # Check if organization name is in the extracted name
            if organization_name.lower() in org_name.lower() and scheme == "FSSC 22000":
                results.append(f"{org_name} - {location}: {certificate_status}")

    driver.quit()

    # Return all matches
    if results:
        return "\n".join(results)
    else:
        return "Organization not found or does not have a valid FSSC 22000 certificate."

# Example Usage
org_input = input("Enter Organization Name: ")
status = get_certificate_status(org_input)
print(status)
