const express = require('express');
const router = express.Router();
const detalleOrdenController = require('../controllers/detalleOrdenController');

router.post('/', detalleOrdenController.crearDetalleOrden);
router.get('/:idorden', detalleOrdenController.obtenerDetallesPorIdOrden);
router.put('/:id', detalleOrdenController.actualizarDetalleOrden);
router.delete('/:id', detalleOrdenController.eliminarDetalleOrden);

module.exports = router;
