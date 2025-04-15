import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import "../style/Predios.css";

const Predios = () => {
    const { token, user } = useAuth();
    const [predio, setPredio] = useState(null);
    const [formData, setFormData] = useState({
        NombrePredio: "",
        Ubicacion: "",
        Latitud: "",
        Longitud: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const obtenerMiPredio = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/predios/mio", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setPredio(response.data); // 👈 ahora es un solo objeto
        } catch (error) {
            if (error.response?.status === 404) {
                setPredio(null); // el empleado no tiene un predio aún
            } else {
                console.error("❌ Error al cargar tu predio:", error);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/predios", formData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert("✅ Predio creado correctamente");
            obtenerMiPredio();
        } catch (error) {
            console.error("❌ Error creando predio:", error);
            alert("Error creando predio");
        }
    };

    useEffect(() => {
        if (token && user?.tipo === "empleado") {
            obtenerMiPredio();
        }
    }, [token, user]);

    return (
        <div className="predios-container">
            <h2>Mi Predio</h2>

            {/* Mostrar formulario si no tiene predio */}
            {user?.tipo === "empleado" && !predio && (
                <form onSubmit={handleSubmit}>
                    <input name="NombrePredio" placeholder="Nombre" onChange={handleChange} required />
                    <input name="Ubicacion" placeholder="Ubicación" onChange={handleChange} required />
                    <input name="Latitud" placeholder="Latitud" onChange={handleChange} required />
                    <input name="Longitud" placeholder="Longitud" onChange={handleChange} required />
                    <button type="submit">Crear Predio</button>
                </form>
            )}

            {/* Mostrar datos si ya tiene predio */}
            {predio && (
                <ul>
                    <li><strong>Nombre:</strong> {predio.NombrePredio}</li>
                    <li><strong>Ubicación:</strong> {predio.Ubicacion}</li>
                    <li><strong>Latitud:</strong> {predio.Latitud}</li>
                    <li><strong>Longitud:</strong> {predio.Longitud}</li>
                </ul>
            )}
        </div>
    );
};

export default Predios;
