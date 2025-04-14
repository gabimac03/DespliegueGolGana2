import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const PredioDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [predio, setPredio] = useState(null);
  const [canchas, setCanchas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const predioRes = await axios.get(`http://localhost:5000/api/predios/${id}`);
        setPredio(predioRes.data);

        const canchasRes = await axios.get(`http://localhost:5000/api/predios/${id}/canchas`);
        setCanchas(canchasRes.data);
      } catch (error) {
        console.error("Error al obtener datos del predio:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleReservar = (cancha) => {
    navigate(`/reservar/${cancha.IDCancha}`, {
      state: { cancha }
    });
  };

  return (
    <div className="p-4">
      {predio && (
        <>
          <h2 className="text-2xl font-bold">{predio.NombrePredio}</h2>
          <p className="text-gray-600 mb-4">Ubicación: {predio.Ubicacion}</p>

          <h3 className="text-xl font-semibold">Canchas disponibles</h3>
          <ul className="space-y-2">
            {canchas.map((cancha) => (
              <li key={cancha.IDCancha} className="border p-2 rounded shadow">
                <p><strong>Nombre:</strong> {cancha.NombreCancha}</p>
                <p><strong>Capacidad:</strong> {cancha.Capacidad} personas</p>
                <p><strong>Disciplina:</strong> {cancha.Disciplina}</p>
                <button
                  className="mt-2 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                  onClick={() => handleReservar(cancha)}
                >
                  Reservar
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default PredioDetalle;
