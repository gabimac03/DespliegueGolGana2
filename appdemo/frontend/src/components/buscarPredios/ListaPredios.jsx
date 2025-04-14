import { Link } from "react-router-dom";

const ListaPredios = ({ predios }) => {
    return (
        <ul>
            {predios.map((predio) => (
                <li key={predio.IDPredio}>
                    <strong>{predio.NombrePredio}</strong> - {predio.Ubicacion}<br />
                    Distancia: {predio.distancia?.toFixed(2)} km <br />
                    <Link to={`/predios/${predio.IDPredio}`}>Ver más</Link>

                    {/* Mostrar canchas si existen */}
                    {predio.Canchas && predio.Canchas.length > 0 && (
                        <ul>
                            {predio.Canchas && predio.Canchas.map((cancha) => (
                                <li key={cancha.IDCancha}>
                                    <Link to={`/reservar/${cancha.IDCancha}`}>
                                        Reservar {cancha.Nombre || 'Cancha sin nombre'} ({cancha.Tipo || 'Tipo desconocido'})
                                    </Link>
                                </li>
                            ))}

                        </ul>
                    )}
                </li>
            ))}
        </ul>
    );
};

export default ListaPredios;
