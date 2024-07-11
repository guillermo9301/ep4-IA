const DetalleOrden = require('../models/detalleOrdenModel');

exports.crearDetalleOrden = (req, res) => {
    const nuevoDetalle = new DetalleOrden(req.body);
    DetalleOrden.registrar(nuevoDetalle, (err, data) => {
        if (err) res.status(500).send(err);
        else res.send(data);
    });
};

exports.obtenerDetallesPorIdOrden = (req, res) => {
    DetalleOrden.obtenerPorIdOrden(req.params.idorden, (err, data) => {
        if (err) res.status(500).send(err);
        else res.send(data);
    });
};

exports.actualizarDetalleOrden = (req, res) => {
    DetalleOrden.actualizar(req.params.id, req.body, (err, data) => {
        if (err) res.status(500).send(err);
        else res.send(data);
    });
};

exports.eliminarDetalleOrden = (req, res) => {
    DetalleOrden.eliminar(req.params.id, (err, data) => {
        if (err) res.status(500).send(err);
        else res.send(data);
    });
};
