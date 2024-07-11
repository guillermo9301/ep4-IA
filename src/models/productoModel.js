const db = require('../config/db');

class Producto {
    constructor(producto) {
        this.nombre = producto.nombre;
        this.descripcion = producto.descripcion;
        this.precio = producto.precio;
        this.stock = producto.stock;
        this.id_categoria = producto.id_categoria;
    }

    static registrar(nuevoProducto, result) {
        const sql = 'INSERT INTO productos SET ?';
        db.query(sql, nuevoProducto, (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            result(null, { id: res.insertId, ...nuevoProducto });
        });
    }

    static obtenerPorId(id, result) {
        const sql = 'SELECT * FROM productos WHERE id_producto = ?';
        db.query(sql, [id], (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            result(null, res[0]);
        });
    }

    static actualizar(id, producto, result) {
        const sql = 'UPDATE productos SET precio = ?, stock = ? WHERE id_producto = ?';
        db.query(sql, [producto.precio, producto.stock, id], (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }
            result(null, { id: id, ...producto });
        });
    }

    static eliminar(id, result) {
        const sql = 'DELETE FROM productos WHERE id_producto = ?';
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

module.exports = Producto;

