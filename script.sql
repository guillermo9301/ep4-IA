
CREATE TABLE categorias (
    idcategoria INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255),
    descripcion VARCHAR(255)
);
CREATE TABLE productos (
    idproducto INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255),
    descripcion VARCHAR(255),
    precio DECIMAL(10, 2),
    stock INT,
    idcategoria INT,
    FOREIGN KEY (idcategoria) REFERENCES categorias(idcategoria)
);

CREATE TABLE ordenes (
    idorden INT AUTO_INCREMENT PRIMARY KEY,
    idcliente INT,
    estado ENUM('pendiente', 'enviado', 'entregado') NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (idcliente) REFERENCES clientes(idcliente)
);

CREATE TABLE detalles_orden (
    iddetalle INT AUTO_INCREMENT PRIMARY KEY,
    idorden INT,
    idproducto INT,
    cantidad INT,
	total DECIMAL(10, 2) ,
    FOREIGN KEY (idorden) REFERENCES ordenes(idorden),
    FOREIGN KEY (idproducto) REFERENCES productos(idproducto)
);

CREATE TABLE clientes (
    idcliente INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255),
    correo VARCHAR(255),
    telefono VARCHAR(9),
    direccion VARCHAR(255)
);
