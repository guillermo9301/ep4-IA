const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

router.post('/nuevo', clienteController.registrarCliente);
router.get('/:id', clienteController.obtenerCliente);
router.put('/editar/:id', clienteController.actualizarCliente);
router.delete('/eliminar/:id', clienteController.eliminarCliente);

module.exports = router;
