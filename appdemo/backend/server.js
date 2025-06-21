require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Ruta de salud para Google Cloud
app.get('/', (req, res) => {
  res.send('Backend funcionando');
});

// Importar rutas
const reservasRoutes = require('./routes/reservas.routes');
const disciplinasRoutes = require('./routes/disciplinas.routes');
const canchasRoutes = require('./routes/canchas.routes');
const prediosRoutes = require('./routes/predios.routes');
const usuariosRoutes = require('./routes/usuarios.routes');

// Usar rutas
app.use("/api/reservas", reservasRoutes);
app.use("/api/disciplinas", disciplinasRoutes);
app.use("/api/canchas", canchasRoutes);
app.use("/api/predios", prediosRoutes);
app.use("/api/usuarios", usuariosRoutes);

// Ejecutar script SQL si es necesario
const initDB = require('./config/setupDB');
initDB();

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Servidor corriendo en el puerto http://0.0.0.0:${PORT}`);
});



