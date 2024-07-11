const express = require('express');
const router = express.Router();
const ordenController = require('../controllers/ordenController');

router.post('/nueva', ordenController.crearOrden);
router.get('/:id', ordenController.obtenerOrden);
router.put('/editar/:id', ordenController.actualizarOrden);
router.delete('/eliminar/:id', ordenController.eliminarOrden);

module.exports = router;
