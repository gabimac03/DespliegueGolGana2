import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
    const [usuario, setUsuario] = useState(null);
    const { token, user } = useAuth();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/usuarios/perfil", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUsuario(response.data); // Seteamos los datos del usuario
            } catch (error) {
                console.error("❌ Error obteniendo datos del usuario", error);
            }
        };

        if (token) fetchUserData();
    }, [token]);

    return (
        <div>
            <h2>Dashboard</h2>
            {usuario ? (
                <div>
                    <p><strong>Nombre:</strong> {usuario.Nombre}</p>
                    <p><strong>Correo:</strong> {usuario.Correo}</p>
                    <p><strong>Telefono:</strong> {usuario.Telefono}</p>
                    <p><strong>Tipo:</strong> {usuario.Tipo}</p>
                </div>
            ) : (
                <p>Cargando datos...</p>
            )}
        </div>
    );
};

export default Dashboard;
