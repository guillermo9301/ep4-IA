const express = require('express');
const router = express.Router();
const ordenController = require('../controllers/ordenController');

router.post('/', ordenController.crearOrden);
router.get('/:id', ordenController.obtenerOrden);
router.put('/:id', ordenController.actualizarOrden);
router.delete('/:id', ordenController.eliminarOrden);

module.exports = router;
