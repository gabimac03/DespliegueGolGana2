Proyecto GolGana - Instrucciones para ejecutar el proyecto
Este proyecto contiene una aplicación completa con frontend en React y backend en Node.js + Express.

Requisitos previos
Node.js (versión 18 o superior)

Descargar desde: https://nodejs.org/
MySQL o MariaDB

Tener una base de datos corriendo localmente.
Importar el archivo .sql si se proporciona, con la estructura de tablas y datos iniciales.
Estructura del proyecto
ProyectoGolGana/
├── backend/          # Servidor Express (API REST)
├── frontend/         # Aplicación React con Vite
├── package.json      # Script de inicio global con concurrently
1. Instalación de dependencias
Desde la carpeta raiz del proyecto, ejecutar:

npm install
Luego instalar dependencias en cada parte:

cd backend
npm install

cd ../frontend
npm install
2. Configurar base de datos
Editar el archivo backend/config/db.js y asegurarse de que los datos coincidan con tu entorno:

const db = mysql.createConnection({
  host: 'localhost',
  user: 'tu_usuario',
  password: 'tu_password',
  database: 'nombre_de_tu_base'
});
Importar el esquema si se provee con:

mysql -u usuario -p nombre_de_tu_base < esquema.sql
3. Iniciar la aplicación
Desde la carpeta raíz del proyecto, ejecutar:

npm run start
Este comando ejecutará el backend y el frontend al mismo tiempo gracias al paquete concurrently.

Frontend: http://localhost:5173
Backend: http://localhost:5000
4. Consideraciones adicionales
Asegurate de que los puertos 5173 y 5000 estén libres.
Si el backend no conecta con la base de datos, revisá las credenciales.
Si el frontend no puede conectarse, verificá las rutas en los axios.get(...).
¡Listo para usar!
Cualquier duda o error, revisar la consola para obtener detalles del fallo.

Hecho con ⚽ por el equipo de Proyecto GolGana.
