
CREATE TABLE Usuarios (
  IDUsuario INT AUTO_INCREMENT PRIMARY KEY,
  Nombre VARCHAR(100) NOT NULL,
  Telefono VARCHAR(15) NOT NULL,
  Correo VARCHAR(100) NOT NULL UNIQUE,
  Password VARCHAR(255) NOT NULL,
  Tipo ENUM('cliente', 'empleado', 'administrador') NOT NULL,
  FechaCreacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Predios (
  IDPredio INT AUTO_INCREMENT PRIMARY KEY,
  NombrePredio VARCHAR(100) NOT NULL,
  Ubicacion VARCHAR(255) NOT NULL,
  Latitud DECIMAL(9, 6),
  Longitud DECIMAL(9, 6)
);

CREATE TABLE Empleados (
  IDEmpleado INT AUTO_INCREMENT PRIMARY KEY,
  IDUsuario INT UNIQUE,
  IDPredio INT,
  FOREIGN KEY (IDUsuario) REFERENCES Usuarios(IDUsuario) ON DELETE CASCADE,
  FOREIGN KEY (IDPredio) REFERENCES Predios(IDPredio) ON DELETE CASCADE
);

CREATE TABLE Disciplinas (
  IDDisciplina INT AUTO_INCREMENT PRIMARY KEY,
  NombreDisciplina VARCHAR(100) NOT NULL
);

INSERT INTO Disciplinas (NombreDisciplina) VALUES
  ('Fútbol'),
  ('Baloncesto'),
  ('Tenis'),
  ('Voleibol'),
  ('Padel');

CREATE TABLE Canchas (
  IDCancha INT AUTO_INCREMENT PRIMARY KEY,
  IDPredio INT,
  IDDisciplina INT,
  NombreCancha VARCHAR(100) NOT NULL,
  Capacidad INT NOT NULL,
  Precio DECIMAL(10, 2) NOT NULL,
  HorarioDisponible VARCHAR(255) NOT NULL,
  FOREIGN KEY (IDPredio) REFERENCES Predios(IDPredio),
  FOREIGN KEY (IDDisciplina) REFERENCES Disciplinas(IDDisciplina)
);

CREATE TABLE Reservas (
  IDReserva INT AUTO_INCREMENT PRIMARY KEY,
  IDUsuario INT,
  IDCancha INT,
  FechaReserva DATE NOT NULL,
  HoraReserva TIME NOT NULL,
  EstadoReserva ENUM('Pendiente', 'Confirmada', 'Cancelada') DEFAULT 'Pendiente',
  MetodoPago ENUM('Transferencia', 'Efectivo') NOT NULL,
  ConfirmacionEmpleado ENUM('Si', 'No') DEFAULT 'No',
  FOREIGN KEY (IDUsuario) REFERENCES Usuarios(IDUsuario),
  FOREIGN KEY (IDCancha) REFERENCES Canchas(IDCancha)
);
