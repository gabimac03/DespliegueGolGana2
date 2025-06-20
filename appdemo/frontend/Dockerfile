# Etapa de build
FROM node:18 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install
RUN npm audit fix
RUN npm install -g vite

COPY . .

ARG VITE_API_URL

ENV NODE_ENV=production

# ✅ Inyectar variable al build de Vite
RUN VITE_API_URL=$VITE_API_URL npm run build

# Etapa de producción
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]




