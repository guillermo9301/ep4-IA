const db = require('../config/db');

class DetalleOrden {
    constructor(detalle) {
        this.id_orden = detalle.id_orden;
        this.id_producto = detalle.id_producto;
        this.cantidad = detalle.cantidad;
        this.total = detalle.total;
    }

    static registrar(nuevoDetalle, result) {
        const sql = 'INSERT INTO detalles_orden SET ?';
        db.query(sql, nuevoDetalle, (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            result(null, { id: res.insertId, ...nuevoDetalle });
        });
    }

    static obtenerPorIdOrden(idorden, result) {
        const sql = 'SELECT * FROM detalles_orden WHERE id_orden = ?';
        db.query(sql, [idorden], (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            result(null, res);
        });
    }

    static actualizar(id, detalle, result) {
        const sql = 'UPDATE detalles_orden SET id_producto = ?, cantidad = ?, total = ? WHERE id_detalle = ?';
        db.query(sql, [detalle.idproducto, detalle.cantidad, detalle.total, id], (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }
            result(null, { id: id, ...detalle });
        });
    }

    static eliminar(id, result) {
        const sql = 'DELETE FROM detalles_orden WHERE iddetalle = ?';
        db.query(sql, [id], (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }
            result(null, res);
        });
    }
}

module.exports = DetalleOrden;
