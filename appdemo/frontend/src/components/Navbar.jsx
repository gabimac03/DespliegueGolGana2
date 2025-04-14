import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav>
            <ul>
                <li><Link to="/">Inicio</Link></li>

                {!user ? (
                    <>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Registro</Link></li>
                    </>
                ) : (
                    <>
                        <li><Link to="/dashboard">Panel</Link></li>

                        {/* Links solo visibles para empleados */}
                        {user.tipo === "empleado" ? (
                            <>
                                <li><Link to="/reservas-admin">Gestionar Reservas</Link></li>
                                <li><Link to="/crear-predio">Crear Predio</Link></li>
                                <li><Link to="/buscar-predios">Buscar Predios</Link></li>
                                <li><Link to="/predios">Mis Predios</Link></li>
                                <li><Link to="/crear-cancha">Crear Cancha</Link></li>
                                <li><Link to="/mis-canchas">Mis Canchas</Link></li>
                            </>
                        ) : (
                            <>
                            <li><Link to="/buscar-predios">Buscar Predios</Link></li>
                            <li><Link to="/reservas">Reservas</Link></li>
                            </>
                        )}

                        <li><strong>{user.Nombre}</strong> ({user.Correo})</li>
                        <li><button onClick={handleLogout}>Cerrar sesión</button></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;