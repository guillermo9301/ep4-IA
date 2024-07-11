const db = require('../config/db');

class Cliente {
    constructor(cliente) {
        this.nombre = cliente.nombre;
        this.correo = cliente.correo;
        this.telefono = cliente.telefono;
        this.direccion = cliente.direccion;
    }

    static registrar(nuevoCliente, result) {
        const sql = 'INSERT INTO clientes SET ?';
        db.query(sql, nuevoCliente, (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            result(null, { id: res.insertId, ...nuevoCliente });
        });
    }

    static obtenerPorId(id, result) {
        const sql = 'SELECT * FROM clientes WHERE idcliente = ?';
        db.query(sql, [id], (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            result(null, res[0]);
        });
    }

    static actualizar(id, cliente, result) {
        const sql = 'UPDATE clientes SET telefono = ?, direccion = ? WHERE idcliente = ?';
        db.query(sql, [cliente.telefono, cliente.direccion, id], (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            result(null, { id: id, ...cliente });
        });
    }

    static eliminar(id, result) {
        const sql = 'DELETE FROM clientes WHERE idcliente = ?';
        db.query(sql, [id], (err, res) => {
            if (err) {
                result(err, null);
                return;
            }
            result(null, res);
        });
    }
}

module.exports = Cliente;
