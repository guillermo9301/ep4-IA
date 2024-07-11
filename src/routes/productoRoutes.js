const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');


router.post('/nuevo', productoController.crearProducto);
router.get('/:id', productoController.obtenerProducto);
router.put('/editar/:id', productoController.actualizarProducto);
router.delete('/eliminar/:id', productoController.eliminarProducto);

module.exports = router;
