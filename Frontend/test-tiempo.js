import { chromium }  from 'playwright';
import path  from 'path';

(async () => {
  console.log('🚀 Iniciando prueba automatizada de carga doble (BDA + BFE)...');

  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  try {
    // 1. Login
    console.log('🔐 Accediendo al sistema...');
    await page.goto('http://localhost:3009/login');
    await page.fill('#email', 'ief_infor@test.cl');
    await page.fill('input[type="password"]', 'ief_infor123');
    await page.click('button[type="submit"]');
    await page.waitForNavigation();

    // 2. Ir a home (o página de carga)
    console.log('🏠 Navegando a la página de carga...');
    await page.goto('http://localhost:3009/home'); // Cambia si tu ruta es distinta

    // 3. Esperar el input de archivo
    console.log('📂 Esperando input de archivos...');
    await page.waitForSelector('input[type="file"]');

    // 4. Definir rutas absolutas
    const bdaPath = path.resolve('./Backend/storage/2024_BDA_4UTCUTS.xlsx');
    const bfePath = path.resolve('./Backend/storage/2024_BFE_4UTCUTS.xlsx.xlsx');

    // 5. Subir ambos archivos
    console.log('📤 Cargando archivos BDA y BFE...');
    await page.setInputFiles('input[type="file"]', [bdaPath, bfePath]);

    // 6. Confirmar archivo visualmente (ajusta selector si tu UI cambia)
    const fileNameVisible = await page.innerText('.bg-navegator'); // asegúrate que este elemento muestre los nombres
    console.log(`📄 Archivos seleccionados: ${fileNameVisible}`);

    // 7. Hacer clic en botón de carga
    console.log('📨 Enviando archivos para procesamiento...');
    const start = Date.now();
    await page.click('#upload-button'); // Asegúrate que este sea el botón correcto

    // 8. Esperar indicador de éxito (ajusta el selector si es diferente)
    await page.waitForSelector('.upload-success', { timeout: 20000 });
    const end = Date.now();

    const duration = ((end - start) / 1000).toFixed(2);
    console.log(`✅ Archivos procesados exitosamente en ${duration} segundos`);

  } catch (error) {
    console.error('❌ Error en la prueba:', error.message);
  } finally {
    console.log('🧹 Cerrando navegador...');
    await browser.close();
  }
})();