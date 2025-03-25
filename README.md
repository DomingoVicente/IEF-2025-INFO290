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
- **recomendado si no quiere intalar lo anterior**: Docker (para ejecución en contenedores)
- **Importante** se debe crear un archivo llamado .env en donde van los datos que estan dentro del archivo llamado env.ejemplo
---

## Instalación

### 1. Clonar el repositorio
Clona este repositorio en tu máquina local:
```bash
git clone <URL del repositorio>
cd <nombre del repositorio>
```

### 2. Instalar las dependencias
Ejecuta el siguiente comando en consola para instalar todas las dependencias necesarias **El comando debe ejecutarse dentro de la carpeta backend y frontend**:

```bash
npm install
```

---

## Configuración de Ambiente

Para configurar el entorno de la aplicación, crea un archivo `.env` en la carpeta frontend del proyecto y agrega las siguientes variables según tus necesidades:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_BACKEND_URL = "http://localhost:5009/api"

```

Asegúrate de ajustar las rutas y configuraciones según tu entorno.

Se entrega un archivo dentro de la carpeta frontend llamado env.txt donde puede copiar las varibles necesarias y ponerlas en el archivo .env correspondiente.

---

## Ejecución

### Ejecución local-Frontend (sin Docker)
1. Para iniciar el servidor en modo local, utiliza (dentro de la carpeta frontend):
   ```bash
   npm start
   ```
2. El servidor estará disponible en el puerto definido en el archivo de configuración (por defecto: `http://localhost:3009`).

### Ejecución local-Backend (sin Docker)
1. Para iniciar el servidor en modo local, utiliza (dentro de la carpeta backend):
   ```bash
   node index
   ```
2. El servidor estará disponible en el puerto definido en el archivo de configuración (por defecto: `http://localhost:3009`).

### Ejecución con Docker 

En la carpeta raiz del proyecto: 

1. Construye y ejecuta los contenedores:
   ```bash
   docker compose up -d
   ```
2. Visualizar la ejecucion:
   ```bash
   docker compose logs -f
   ```

5. Accede a la aplicación a través de la URL del contenedor (por defecto: `http://localhost:3009`).

4. Terminar la ejecucion del contenedor:
   ```bash
    docker compose down
   ```
---



## Uso de la Aplicación

1. Accede a la aplicación web desde tu navegador. 
   usuario : ief_infor@test.com  |  Contraseña: ief_infor123
2. Carga los dos archivos necesarios a través del formulario.
3. Haz clic en el botón de "Procesar".
4. Descarga el archivo Excel generado.

---

## Contacto

Si tienes preguntas o necesitas ayuda, no dudes en contactarnos:
- **Correo**: support@ejemplo.com
- **GitHub**: [DomingoVicente](https://github.com/DomingoVicente)
