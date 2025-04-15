// src/pages/CrearCancha.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../style/CrearCancha.css";

const CrearCancha = () => {
    const { token, user } = useAuth(); // Para obtener el token y verificar tipo de usuario
    const navigate = useNavigate();

    // Estados para las disciplinas y el formulario de la cancha
    const [disciplinas, setDisciplinas] = useState([]);
    const [formData, setFormData] = useState({
        NombreCancha: "",
        Capacidad: "",
        Precio: "",
        HorarioDisponible: "",
        IDDisciplina: "",
    });

    // Cargar disciplinas desde el backend
    useEffect(() => {
        const fetchDisciplinas = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/disciplinas");
                setDisciplinas(response.data);
            } catch (error) {
                console.error("Error al obtener disciplinas", error);
            }
        };
        fetchDisciplinas();
    }, []);

    // Manejo de cambios en los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Manejo de la creación de la cancha
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/canchas", formData, {
                headers: {
                    Authorization: `Bearer ${token}`, // Se pasa el token en la cabecera
                },
            });
            alert("Cancha creada con éxito");
            navigate("/"); // Redirige al panel de administración o alguna otra página
        } catch (error) {
            console.error("Error al crear la cancha", error);
            alert("Error al crear la cancha");
        }
    };

    return (
        <div className="crear-cancha-container">
            <h2>Crear Cancha</h2>
            <form onSubmit={handleSubmit}>
                <input
                    name="NombreCancha"
                    value={formData.NombreCancha}
                    onChange={handleChange}
                    placeholder="Nombre de la cancha"
                    required
                />
                <input
                    name="Capacidad"
                    type="number"
                    value={formData.Capacidad}
                    onChange={handleChange}
                    placeholder="Capacidad"
                    required
                />
                <input
                    name="Precio"
                    type="number"
                    value={formData.Precio}
                    onChange={handleChange}
                    placeholder="Precio por hora"
                    required
                />
                <input
                    name="HorarioDisponible"
                    value={formData.HorarioDisponible}
                    onChange={handleChange}
                    placeholder="Horario disponible"
                    required
                />
                <select
                    name="IDDisciplina"
                    value={formData.IDDisciplina}
                    onChange={handleChange}
                    required
                >
                    <option value="">Seleccione una disciplina</option>
                    {disciplinas.map((disciplina) => (
                        <option key={disciplina.IDDisciplina} value={disciplina.IDDisciplina}>
                            {disciplina.NombreDisciplina}
                        </option>
                    ))}
                </select>
                <button type="submit">Crear Cancha</button>
            </form>
        </div>
    );
};

export default CrearCancha;
