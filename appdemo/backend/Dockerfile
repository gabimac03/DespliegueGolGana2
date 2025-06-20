# Imagen base de Node.js
FROM node:18

# Carpeta de trabajo dentro del contenedor
WORKDIR /app

# Copiar archivos de definición de paquetes
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Copiar explícitamente el script de creación de tablas (por si se ignora en .dockerignore)
COPY GolGana.sql ./GolGana.sql

# Exponer el puerto 5000 (usado por la app)
EXPOSE 5000

# Comando de inicio
CMD ["npm", "start"]
