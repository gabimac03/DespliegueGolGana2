import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
    const [formData, setFormData] = useState({ Correo: "", Password: "" });
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:5000/api/usuarios/login", formData);
            
            const token = response.data.token;
            const userData = response.data.usuario;
            
            login(userData, token); // Actualiza el contexto global

            alert("Inicio de sesión exitoso");

            // Redirige según tipo de usuario
            if (userData.tipo === "empleado") {
                navigate("/"); // Si es empleado, redirigimos a reservas-admin
            } else {
                navigate("/"); // Si es cliente, redirigimos a su Dashboard
            }

        } catch (error) {
            console.error("Error en el login:", error.response?.data || error.message);
            alert("Credenciales incorrectas");
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="Correo"
                    placeholder="Correo"
                    value={formData.Correo}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="Password"
                    placeholder="Contraseña"
                    value={formData.Password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Iniciar sesión</button>
            </form>
        </div>
    );
};

export default Login;
