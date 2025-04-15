import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import "../style/MisCanchas.css"

const MisCanchas = () => {
    const { token, user } = useAuth();
    const [canchas, setCanchas] = useState([]);
    const [formData, setFormData] = useState({
        NombreCancha: "",
        Capacidad: "",
        Precio: "",
        HorarioDisponible: "",
        IDDisciplina: "",
    });
    const [disciplinas, setDisciplinas] = useState([]);
    const [editando, setEditando] = useState(null); // null o ID de la cancha

    useEffect(() => {
        obtenerCanchas();
        obtenerDisciplinas();
    }, []);

    const obtenerCanchas = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/canchas", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCanchas(res.data);
        } catch (error) {
            console.error("Error al obtener canchas:", error);
        }
    };

    const obtenerDisciplinas = async () => {
        try {
            const res = await axios.get("http://localhost:5000/api/disciplinas");
            setDisciplinas(res.data);
        } catch (error) {
            console.error("Error al obtener disciplinas:", error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editando) {
                await axios.put(`http://localhost:5000/api/canchas/${editando}`, formData, {
                    headers: { Authorization: `Bearer ${token}` },
                });
            } else {
                await axios.post("http://localhost:5000/api/canchas", formData, {
                    headers: { Authorization: `Bearer ${token}` },
                });
            }
            setFormData({
                NombreCancha: "",
                Capacidad: "",
                Precio: "",
                HorarioDisponible: "",
                IDDisciplina: "",
            });
            setEditando(null);
            obtenerCanchas();
        } catch (error) {
            console.error("Error al guardar cancha:", error);
        }
    };

    const handleEditar = (cancha) => {
        setFormData(cancha);
        setEditando(cancha.IDCancha);
    };

    const handleEliminar = async (id) => {
        if (confirm("¿Eliminar esta cancha?")) {
            try {
                await axios.delete(`http://localhost:5000/api/canchas/${id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                obtenerCanchas();
            } catch (error) {
                console.error("Error al eliminar cancha:", error);
            }
        }
    };

    return (
        <div className="mis-canchas-container">
            <h2>{editando ? "Editar Cancha" : "Crear Nueva Cancha"}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="NombreCancha"
                    placeholder="Nombre de la cancha"
                    value={formData.NombreCancha}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="Capacidad"
                    placeholder="Capacidad"
                    value={formData.Capacidad}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="Precio"
                    placeholder="Precio"
                    value={formData.Precio}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="HorarioDisponible"
                    placeholder="Ej: 08:00-20:00"
                    value={formData.HorarioDisponible}
                    onChange={handleChange}
                    required
                />
                <select name="IDDisciplina" value={formData.IDDisciplina} onChange={handleChange} required>
                    <option value="">Seleccionar disciplina</option>
                    {disciplinas.map((d) => (
                        <option key={d.IDDisciplina} value={d.IDDisciplina}>
                            {d.NombreDisciplina}
                        </option>
                    ))}
                </select>
                <button type="submit">{editando ? "Actualizar" : "Crear"}</button>
            </form>

            <hr />
            <h3>Mis Canchas</h3>
            <ul>
                {canchas.map((cancha) => (
                    <li key={cancha.IDCancha}>
                        <strong>{cancha.NombreCancha}</strong> - {cancha.NombreDisciplina} - ${cancha.Precio}
                        <br />
                        Capacidad: {cancha.Capacidad}, Horario: {cancha.HorarioDisponible}
                        <br />
                        <button onClick={() => handleEditar(cancha)}>Editar</button>
                        <button onClick={() => handleEliminar(cancha.IDCancha)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MisCanchas;
