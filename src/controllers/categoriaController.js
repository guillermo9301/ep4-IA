const Categoria = require('../models/categoriaModel');

exports.crearCategoria = (req, res) => {
    const nuevaCategoria = new Categoria(req.body);
    Categoria.registrar(nuevaCategoria, (err, data) => {
        if (err) res.status(500).send(err);
        else res.send(data);
    });
};

exports.obtenerCategorias = (req, res) => {
    Categoria.obtenerCategorias((err, data) => {
        if (err) res.status(500).send(err);
        else res.send(data);
    });
};

exports.actualizarCategoria = (req, res) => {
    Categoria.actualizar(req.params.id, req.body, (err, data) => {
        if (err) res.status(500).send(err);
        else res.send(data);
    });
};

exports.eliminarCategoria = (req, res) => {
    Categoria.eliminar(req.params.id, (err, data) => {
        if (err) res.status(500).send(err);
        else res.send(data);
    });
};
