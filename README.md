# Aplicación Web de Generación de Excel

## Descripción

Esta es una aplicación web que permite a los usuarios cargar dos archivos, procesarlos y generar un archivo Excel de salida con los datos combinados o transformados según las necesidades del sistema. Está diseñada para manejar grandes volúmenes de datos y realizar transformaciones específicas de manera eficiente.

---

## Requisitos

- **Node.js**: v20.17.0 o superior  
- **npm**: v10.8.2 o superior  
- **Frameworks y librerías necesarias**:
  - Express.js
  - Axios
  - cors: v2.8.5
  - multer: v1.4.5-lts.1
  - xlsx-populate: v1.21.0
- **Opcional**: Docker (para ejecución en contenedores)

---

## Instalación

### 1. Clonar el repositorio
Clona este repositorio en tu máquina local:
```bash
git clone <URL del repositorio>
cd <nombre del repositorio>
```

### 2. Instalar las dependencias
Ejecuta el siguiente comando para instalar todas las dependencias necesarias:
```bash
npm install
```

### 3. En caso de usar contenedores Docker
Si prefieres utilizar los contenedores Docker, carga las imágenes previamente generadas:
```bash
docker load -i frontend.tar
docker load -i backend.tar
docker images
```

---

## Compilación

Si es necesario compilar el código (por ejemplo, si usas TypeScript o algún preprocesador), sigue estos pasos:

1. Asegúrate de que todos los archivos fuente estén correctamente configurados.
2. Ejecuta el siguiente comando para compilar:
   ```bash
   En la carpeta raiz: npm run start
   ```

---

## Ejecución

### Ejecución local (sin Docker)
1. Para iniciar el servidor en modo local, utiliza:
   ```bash
   npm start
   ```
2. El servidor estará disponible en el puerto definido en el archivo de configuración (por defecto: `http://localhost:3009`).

### Ejecución con Docker
1. Construye y ejecuta los contenedores:
   ```bash
   docker-compose up
   ```
2. Accede a la aplicación a través de la URL del contenedor (por defecto: `http://localhost:3009`).

---

## Configuración de Ambiente

Para configurar el entorno de la aplicación, crea un archivo `.env` en la raíz del proyecto y agrega las siguientes variables según tus necesidades:

```env
PORT=3009
REACT_APP_API_URL=http://localhost:4009
```

Asegúrate de ajustar las rutas y configuraciones según tu entorno.

---

## Uso de la Aplicación

1. Accede a la aplicación web desde tu navegador.
2. Carga los dos archivos necesarios a través del formulario.
3. Haz clic en el botón de "Procesar".
4. Descarga el archivo Excel generado.

---

## Contacto

Si tienes preguntas o necesitas ayuda, no dudes en contactarnos:
- **Correo**: support@ejemplo.com
- **GitHub**: [DomingoVicente](https://github.com/DomingoVicente)
