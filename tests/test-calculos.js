import { chromium } from 'playwright';
import fs from 'fs';

// Leer datos desde el archivo externo
const testData = JSON.parse(fs.readFileSync('test-calculos.json', 'utf-8'));

(async () => {
  console.log('Iniciando prueba negativa (sin archivos seleccionados)...');

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // 1. Login
    console.log('Accediendo al sistema...');
    await page.goto('http://localhost:3009/login');
    await page.fill('#email', testData.login.email);
    await page.fill('input[type="password"]', testData.login.password);
    await page.click('button[type="submit"]');
    await page.waitForNavigation();

    // 2. Página de carga
    console.log('Navegando a la página de carga...');
    await page.goto('http://localhost:3009/home');

    // 3. Seleccionar solo el año
    console.log('Seleccionando año...');
    await page.locator('select').nth(2).selectOption({ label: testData.testCase.year });

    // 4. Clic en “Generar Cálculos”
    console.log('Intentando generar cálculos...');
    await page.click('button:has-text("Generar Cálculos")');

    // 5. Esperar y validar mensaje de error
    const errorMsg = await page.waitForSelector(`text=${testData.testCase.expectedErrorMsg}`, { timeout: 5000 });

    if (errorMsg) {
      console.log('Mensaje de error mostrado correctamente');
    } else {
      console.log('No se mostró el mensaje de error esperado');
    }

  } catch (error) {
    console.error('Error en la prueba negativa:', error.message);
  } finally {
    console.log('Cerrando navegador...');
    await browser.close();
  }
})();