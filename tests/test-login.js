import { chromium } from 'playwright';
import fs from 'fs';

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Inicia cobertura V8
  const client = await context.newCDPSession(page);
  await client.send('Profiler.enable');
  await client.send('Profiler.startPreciseCoverage', { callCount: true, detailed: true });

  // Navega y hace el login como en tu script
  await page.goto('https://tusitio.com/login');
  await page.fill('#email', 'usuario@correo.com');
  await page.fill('input[type="password"]', '123456');
  await page.click('button[type="submit"]');
  await page.waitForNavigation();

  // Espera a que el dashboard cargue
  await page.waitForSelector('#dashboard');

  // Detiene y obtiene la cobertura
  const result = await client.send('Profiler.takePreciseCoverage');
  await client.send('Profiler.stop');

  // Guarda el resultado
  fs.writeFileSync('coverage-v8.json', JSON.stringify(result, null, 2));

  await browser.close();
})();
