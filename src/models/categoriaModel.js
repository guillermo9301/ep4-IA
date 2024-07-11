const db = require('../config/db');

class Categoria {
    constructor(categoria) {
        this.nombre = categoria.nombre;
        this.descripcion = categoria.descripcion;
    }

    static registrar(nuevaCategoria, result) {
        const sql = 'INSERT INTO categorias SET ?';
        db.query(sql, nuevaCategoria, (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            result(null, { id: res.insertId, ...nuevaCategoria });
        });
    }

    static obtenerCategorias(result) {
        const sql = 'SELECT * FROM categorias';
        db.query(sql, (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            result(null, res); // Devolver todas las filas
        });
    }

    static actualizar(id, categoria, result) {
        const sql = 'UPDATE categorias SET nombre = ?, descripcion = ? WHERE id_categoria = ?';
        db.query(sql, [categoria.nombre, categoria.descripcion, id], (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            if (res.affectedRows == 0) {
                result({ kind: "not_found" }, null);
                return;
            }
            result(null, { id: id, ...categoria });
        });
    }

    static eliminar(id, result) {
        const sql = 'DELETE FROM categorias WHERE id_categoria = ?';
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

module.exports = Categoria;


