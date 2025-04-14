import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [formData, setFormData] = useState({
        Nombre: "",
        Telefono: "",
        Correo: "",
        Password: "",
        Tipo: "cliente",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/api/usuarios", formData);
            alert("Registro exitoso, ahora puedes iniciar sesión.");
            navigate("/login");
        } catch (error) {
            console.error("Error en el registro", error);
            alert("Error al registrar usuario");
        }
    };

    return (
        <div>
            <h2>Registro</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="Nombre" placeholder="Nombre" onChange={handleChange} required />
                <input type="text" name="Telefono" placeholder="Teléfono" onChange={handleChange} required />
                <input type="email" name="Correo" placeholder="Correo" onChange={handleChange} required />
                <input type="password" name="Password" placeholder="Contraseña" onChange={handleChange} required />
                <select name="Tipo" onChange={handleChange}>
                    <option value="cliente">Cliente</option>
                    <option value="empleado">Empleado</option>
                </select>
                <button type="submit">Registrarse</button>
            </form>
        </div>
    );
};

export default Register;
