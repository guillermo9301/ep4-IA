const Producto = require('../models/productoModel');

exports.crearProducto = (req, res) => {
    const nuevoProducto = new Producto(req.body);
    Producto.registrar(nuevoProducto, (err, data) => {
        if (err) res.status(500).send(err);
        else res.send(data);
    });
};

exports.obtenerProducto = (req, res) => {
    Producto.obtenerPorId(req.params.id, (err, data) => {
        if (err) res.status(500).send(err);
        else res.send(data);
    });
};

exports.actualizarProducto = (req, res) => {
    Producto.actualizar(req.params.id, req.body, (err, data) => {
        if (err) res.status(500).send(err);
        else res.send(data);
    });
};

exports.eliminarProducto = (req, res) => {
    Producto.eliminar(req.params.id, (err, data) => {
        if (err) res.status(500).send(err);
        else res.send(data);
    });
};