import { chromium } from 'playwright';

(async () => {
  console.log('Iniciando prueba negativa (sin archivos seleccionados)...');

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // 1. Login
    console.log('Accediendo al sistema...');
    await page.goto('http://localhost:3009/login');
    await page.fill('#email', 'ief_infor@test.cl');
    await page.fill('input[type="password"]', 'ief_infor123');
    await page.click('button[type="submit"]');
    await page.waitForNavigation();

    // 2. Página de carga
    console.log('Navegando a la página de carga...');
    await page.goto('http://localhost:3009/home');

    // 3. Seleccionar solo el año
    console.log('Seleccionando año...');
    await page.locator('select').nth(2).selectOption({ label: '2007' });

    // 4. Clic en “Generar Cálculos”
    console.log('Intentando generar cálculos...');
    await page.click('button:has-text("Generar Cálculos")');

    // 5. Esperar y validar mensaje de error
    const errorMsg = await page.waitForSelector('text=Por favor selecciona ambos archivos BDA, BFE y un año antes de generar cálculos.', { timeout: 5000 });

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