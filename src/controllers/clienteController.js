const Cliente = require('../models/clienteModel');

exports.registrarCliente = (req, res) => {
    const nuevoCliente = new Cliente(req.body);
    Cliente.registrar(nuevoCliente, (err, data) => {
        if (err) res.status(500).send(err);
        else res.send(data);
    });
};

exports.obtenerCliente = (req, res) => {
    Cliente.obtenerPorId(req.params.id, (err, data) => {
        if (err) res.status(500).send(err);
        else res.send(data);
    });
};

exports.actualizarCliente = (req, res) => {
    Cliente.actualizar(req.params.id, req.body, (err, data) => {
        if (err) res.status(500).send(err);
        else res.send(data);
    });
};

exports.eliminarCliente = (req, res) => {
    Cliente.eliminar(req.params.id, (err, data) => {
        if (err) res.status(500).send(err);
        else res.send(data);
    });
};
