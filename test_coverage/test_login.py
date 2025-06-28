import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

@pytest.mark.parametrize("email,password,expected_text", [
    ("ief_infor@test.cl", "ief_infor123", "Página Principal"),
    ("usuario2@test.com", "password2", "Verifica tus credenciales"),
    ("usuario1@test.com", "password1", "Verifica tus credenciales"),
])

def test_login(email, password, expected_text):
    driver = webdriver.Chrome()
    driver.get("http://localhost:3009")

    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.CSS_SELECTOR, '#email')))
    driver.find_element(By.CSS_SELECTOR, '#email').send_keys(email)
    driver.find_element(By.CSS_SELECTOR, 'input[type="password"]').send_keys(password)
    driver.find_element(By.CSS_SELECTOR, 'button[type="submit"]').click()

    # Esperar que aparezca el texto esperado (éxito o error)
    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.XPATH, f"//*[contains(text(), '{expected_text}')]"))
    )

    assert expected_text in driver.page_source

    driver.quit()