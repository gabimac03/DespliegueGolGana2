import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const FormularioReserva = () => {
  const { id } = useParams();
  const [cancha, setCancha] = useState(null);
  const { token } = useAuth();

  const [fecha, setFecha] = useState('');
  const [horario, setHorario] = useState('');
  const [pago, setPago] = useState('');

  useEffect(() => {
    const obtenerCancha = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/canchas/${id}`);
        setCancha(res.data);
      } catch (error) {
        console.error("Error al obtener la cancha:", error);
      }
    };
    obtenerCancha();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevaReserva = {
      IDCancha: Number(id),
      FechaReserva: fecha,
      HoraReserva: horario,
      MetodoPago: pago,
    };

    try {
      await axios.post('http://localhost:5000/api/reservas', nuevaReserva, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Reserva realizada con éxito');
    } catch (error) {
      console.error("Error al hacer la reserva:", error);
      console.log("Respuesta del servidor:", error.response?.data);
    }
  };

  if (!cancha) return <p>Cargando cancha...</p>;

  return (
    <div>
      <h1>Reservar cancha: {cancha.NombreCancha}</h1>
      <p>Capacidad: {cancha.Capacidad}</p>
      <p>Disciplina: {cancha.Disciplina}</p>

      <form onSubmit={handleSubmit}>
        <label>Fecha:</label>
        <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} required />
        <label>Horario:</label>
        <input type="time" value={horario} onChange={(e) => setHorario(e.target.value)} required />
        <label>Forma de pago:</label>
        <select value={pago} onChange={(e) => setPago(e.target.value)} required>
          <option value="">Seleccionar</option>
          <option value="efectivo">Efectivo</option>
          <option value="tarjeta">Tarjeta</option>
        </select>
        <button type="submit">Confirmar Reserva</button>
      </form>
    </div>
  );
};

export default FormularioReserva;

