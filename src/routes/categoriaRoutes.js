const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');


router.post('/nueva', categoriaController.crearCategoria);
router.get('/', categoriaController.obtenerCategorias);
router.put('/editar/:id', categoriaController.actualizarCategoria);
router.delete('/eliminar/:id', categoriaController.eliminarCategoria);

module.exports = router;