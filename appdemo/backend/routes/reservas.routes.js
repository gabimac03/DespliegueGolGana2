const express = require("express");
const verificarToken = require("../middlewares/auth");
const {
    getReservas,
    getTodasLasReservas,
    createReserva,
    confirmarReserva,
    cancelarReserva
} = require("../controllers/reservas.controllers");

const router = express.Router();

// Rutas para clientes (requieren autenticación)
router.get("/", verificarToken, getReservas);
router.post("/", verificarToken, createReserva);

// Rutas para empleados (requieren autenticación y tipo de usuario 'empleado')
router.get("/admin", verificarToken, getTodasLasReservas);
router.put("/confirmar/:IDReserva", verificarToken, confirmarReserva);
router.put("/cancelar/:IDReserva", verificarToken, cancelarReserva);

module.exports = router;
