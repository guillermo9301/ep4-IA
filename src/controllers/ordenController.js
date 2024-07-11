const Orden = require('../models/ordenModel');

exports.crearOrden = (req, res) => {
    const nuevaOrden = new Orden(req.body);
    Orden.registrar(nuevaOrden, (err, data) => {
        if (err) res.status(500).send(err);
        else res.send(data);
    });
};

exports.obtenerOrden = (req, res) => {
    Orden.obtenerPorId(req.params.id, (err, data) => {
        if (err) res.status(500).send(err);
        else res.send(data);
    });
};


exports.actualizarOrden = (req, res) => {
    Orden.actualizar(req.params.id, req.body, (err, data) => {
        if (err) res.status(500).send(err);
        else res.send(data);
    });
};

exports.eliminarOrden = (req, res) => {
    Orden.eliminar(req.params.id, (err, data) => {
        if (err) res.status(500).send(err);
        else res.send(data);
    });
};
