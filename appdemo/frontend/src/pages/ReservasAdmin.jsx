import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ReservasAdmin = () => {
    const [reservas, setReservas] = useState([]);
    const { token } = useAuth(); // Obtén el token desde el contexto
    const navigate = useNavigate();

    useEffect(() => {
        const fetchReservas = async () => {
            try {
                // Verifica si el token está disponible
                if (!token) {
                    console.error("⚠️ No hay token. El usuario no está autenticado.");
                    navigate("/login");  // Redirige al login si no hay token
                    return;
                }

                // Realiza la solicitud para obtener las reservas del backend
                const response = await axios.get("http://localhost:5000/api/reservas/admin", {
                    headers: { Authorization: `Bearer ${token}` },  // Envia el token en los headers
                });

                setReservas(response.data);
            } catch (error) {
                console.error("❌ Error obteniendo reservas", error);
                // Si el error es de autenticación (token inválido o expirado), redirige al login
                if (error.response && error.response.status === 401) {
                    navigate("/login");
                }
            }
        };

        fetchReservas();
    }, [token, navigate]); // Ejecuta la función cuando el token cambie

    const handleAction = async (IDReserva, action) => {
        try {
            // Verifica si el token sigue siendo válido
            if (!token) {
                console.error("⚠️ No hay token. El usuario no está autenticado.");
                navigate("/login");
                return;
            }

            // Realiza la acción de confirmar o cancelar la reserva
            await axios.put(`http://localhost:5000/api/reservas/${action}/${IDReserva}`, {}, {
                headers: { Authorization: `Bearer ${token}` }, // Envía el token en los headers
            });

            alert(`Reserva ${action} correctamente.`);

            // Actualiza el estado local de las reservas
            setReservas((prevReservas) =>
                prevReservas.map((reserva) =>
                    reserva.IDReserva === IDReserva
                        ? { ...reserva, EstadoReserva: action.charAt(0).toUpperCase() + action.slice(1) } // Cambia el estado
                        : reserva
                )
            );
        } catch (error) {
            console.error("❌ Error al actualizar la reserva", error);
            alert("Error al actualizar la reserva.");
        }
    };

    return (
        <div>
            <h2>Gestión de Reservas</h2>
            <ul>
                {reservas.length > 0 ? (
                    reservas.map((reserva) => (
                        <li key={reserva.IDReserva}>
                            {reserva.FechaReserva} - {reserva.HoraReserva} - {reserva.EstadoReserva}
                            {reserva.EstadoReserva === "Pendiente" && (
                                <>
                                    <button onClick={() => handleAction(reserva.IDReserva, "confirmar")}>Confirmar</button>
                                    <button onClick={() => handleAction(reserva.IDReserva, "cancelar")}>Cancelar</button>
                                </>
                            )}
                        </li>
                    ))
                ) : (
                    <p>No hay reservas pendientes.</p>
                )}
            </ul>
        </div>
    );
};

export default ReservasAdmin;

