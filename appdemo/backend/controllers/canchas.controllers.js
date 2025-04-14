const db = require("../config/db");

// Crear cancha
exports.crearCancha = (req, res) => {
    const { NombreCancha, Capacidad, Precio, HorarioDisponible, IDDisciplina } = req.body;
    const IDUsuario = req.usuario.id;

    // Buscar el IDPredio del empleado
    db.query("SELECT IDPredio FROM Empleados WHERE IDUsuario = ?", [IDUsuario], (err, result) => {
        if (err || result.length === 0) return res.status(400).json({ error: "Empleado sin predio asignado" });

        const IDPredio = result[0].IDPredio;

        db.query(
            "INSERT INTO Canchas (IDPredio, IDDisciplina, NombreCancha, Capacidad, Precio, HorarioDisponible) VALUES (?, ?, ?, ?, ?, ?)",
            [IDPredio, IDDisciplina, NombreCancha, Capacidad, Precio, HorarioDisponible],
            (err) => {
                if (err) return res.status(500).json({ error: "Error al crear cancha" });
                res.json({ message: "Cancha creada correctamente" });
            }
        );
    });
};

// Obtener canchas del predio del empleado
exports.obtenerCanchasEmpleado = (req, res) => {
    const IDUsuario = req.usuario.id;

    db.query("SELECT IDPredio FROM Empleados WHERE IDUsuario = ?", [IDUsuario], (err, result) => {
        if (err || result.length === 0) return res.status(400).json({ error: "Empleado sin predio asignado" });

        const IDPredio = result[0].IDPredio;

        db.query(
            `SELECT Canchas.*, Disciplinas.NombreDisciplina 
             FROM Canchas 
             JOIN Disciplinas ON Canchas.IDDisciplina = Disciplinas.IDDisciplina 
             WHERE IDPredio = ?`,
            [IDPredio],
            (err, results) => {
                if (err) return res.status(500).json({ error: "Error al obtener canchas" });
                res.json(results);
            }
        );
    });
};

// Editar cancha
exports.actualizarCancha = (req, res) => {
    const IDCancha = req.params.id;
    const { NombreCancha, Capacidad, Precio, HorarioDisponible, IDDisciplina } = req.body;

    db.query(
        `UPDATE Canchas SET 
            NombreCancha = ?, 
            Capacidad = ?, 
            Precio = ?, 
            HorarioDisponible = ?, 
            IDDisciplina = ?
         WHERE IDCancha = ?`,
        [NombreCancha, Capacidad, Precio, HorarioDisponible, IDDisciplina, IDCancha],
        (err) => {
            if (err) return res.status(500).json({ error: "Error al actualizar cancha" });
            res.json({ message: "Cancha actualizada correctamente" });
        }
    );
};

// Eliminar cancha
exports.eliminarCancha = (req, res) => {
    const IDCancha = req.params.id;

    db.query("DELETE FROM Canchas WHERE IDCancha = ?", [IDCancha], (err) => {
        if (err) return res.status(500).json({ error: "Error al eliminar cancha" });
        res.json({ message: "Cancha eliminada correctamente" });
    });
};

// Obtener canchas por predio (con nombre de la disciplina incluido)
exports.getCanchasPorPredio = (req, res) => {
    const { id } = req.params;

    const sql = `
        SELECT 
            C.IDCancha,
            C.NombreCancha,
            C.Capacidad,
            C.Precio,
            C.HorarioDisponible,
            D.NombreDisciplina AS Disciplina
        FROM Canchas C
        JOIN Disciplinas D ON C.IDDisciplina = D.IDDisciplina
        WHERE C.IDPredio = ?
    `;

    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: "Error al obtener canchas del predio" });

        res.json(result);
    });
};

exports.getCanchaById = (req, res) => {
    const id = req.params.id;

    const sql = `
        SELECT 
            C.IDCancha, 
            C.NombreCancha, 
            C.Capacidad, 
            C.Precio,
            C.HorarioDisponible,
            D.NombreDisciplina AS Disciplina
        FROM Canchas C
        JOIN Disciplinas D ON C.IDDisciplina = D.IDDisciplina
        WHERE C.IDCancha = ?
    `;

    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: "Error al obtener la cancha" });
        if (result.length === 0) return res.status(404).json({ error: "Cancha no encontrada" });
        res.json(result[0]);
    });
};
