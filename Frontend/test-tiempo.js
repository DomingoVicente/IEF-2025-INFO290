import { chromium } from 'playwright';

(async () => {
  console.log('Iniciando prueba de carga de archivos ya subidos...');

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

    // 2. Ir a home
    console.log('Navegando a la página de carga...');
    await page.goto('http://localhost:3009/home');

    // 3. Seleccionar archivos ya subidos
    console.log('Seleccionando archivos...');
    await page.locator('select').nth(0).selectOption({ label: '2024_BDA_4UTCUTS.xlsx' });
    await page.locator('select').nth(1).selectOption({ label: '2024_BFE_4UTCUTS.xlsx' });

    // 4. Seleccionar año
    console.log('Seleccionando año...');
    await page.locator('select').nth(2).selectOption({ label: '2022' });

    // 5. Generar cálculos y medir tiempo
    console.log('Ejecutando cálculos...');
    const start = Date.now();

    await page.click('button:has-text("Generar Cálculos")');

    // 6. Esperar confirmación visual
    await page.waitForSelector('text=Cálculos generados correctamente', { timeout: 100000 });

    const end = Date.now();
    const duration = ((end - start) / 1000).toFixed(2);
    console.log(`Cálculos generados en ${duration} segundos`);

  } catch (error) {
    console.error('Error en la prueba:', error.message);
  } finally {
    console.log('Cerrando navegador...');
    await browser.close();
  }
})();