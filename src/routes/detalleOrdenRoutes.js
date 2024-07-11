const express = require('express');
const router = express.Router();
const detalleOrdenController = require('../controllers/detalleOrdenController');

router.post('/nueva', detalleOrdenController.crearDetalleOrden);
router.get('/:idorden', detalleOrdenController.obtenerDetallesPorIdOrden);
router.put('/editar/:id', detalleOrdenController.actualizarDetalleOrden);
router.delete('/eliminar/:id', detalleOrdenController.eliminarDetalleOrden);

module.exports = router;
