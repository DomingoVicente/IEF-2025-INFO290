import { chromium } from 'playwright';

(async () => {
  console.log('Iniciando prueba de login...');

  try {
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage();

    console.log('Abriendo navegador y accediendo a la página de login...');
    await page.goto('http://localhost:3009/login', { timeout: 10000 });

    console.log('Rellenando el formulario de login...');
    await page.fill('#email', 'ef_infor@test.cl');
    await page.fill('input[type="password"]', 'ef_infor123');

    console.log('Haciendo clic en el botón de login...');
    await page.click('button[type="submit"]');

    console.log('Esperando la redirección o confirmación de login...');
    try {
      await page.waitForNavigation({ timeout: 5000 });
      console.log('Se detectó navegación posterior al login.');
    } catch {
      console.warn('No hubo redirección, verificando si el login aún fue exitoso...');
    }

    // Verificar la URL después del login
    const currentURL = page.url();
    console.log('URL después del login:', currentURL);

    // Verificar si el dashboard está presente (cambiar selector según corresponda)
    try {
      await page.waitForSelector('.dashboard', { timeout: 3000 });
      console.log('Login exitoso: Se detectó el dashboard.');
    } catch {
      console.error('Error: No se encontró el dashboard. Puede que el login haya fallado.');
    }

    console.log('Cerrando navegador...');
    await browser.close();

    console.log('Prueba de login completada.');

  } catch (error) {
    console.error('Error durante la prueba de login:', error.message);
  }
})();
