const request = require('supertest');
const app = require('../src/index');
const db = require('../src/config/db');

let server

beforeAll((done) => {
    server = app.listen(8000, () => {
        console.log('Servidor de pruebas iniciado en el puerto 8000');
        done();
    });
});

afterAll(async () => {
    await new Promise(resolve => server.close(resolve));
    console.log('Servidor de pruebas cerrado');
    await db.close(); // Cerrar la conexión a la base de datos
});


describe('Gestión de Productos', () => {
    let productoId;

    it('Debe crear un nuevo producto', async () => {
        const response = await request(app)
            .post('/productos/nuevo')
            .send({
                nombre: 'Producto de prueba',
                descripcion: 'Descripción del producto de prueba',
                precio: 99.99,
                stock: 10,
                id_categoria: 2,
            });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id');
        productoId = response.body.id;
    });

    it('Debe obtener detalles del producto', async () => {
        const response = await request(app).get(`/productos/${productoId}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('nombre', 'Producto de prueba');
    });

    it('Debe actualizar el producto', async () => {
        const response = await request(app)
            .put(`/productos/editar/${productoId}`)
            .send({
                precio: 89.99,
                stock: 15,
            });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('precio', 89.99);
    });

    it('Debe eliminar el producto', async () => {
        const response = await request(app).delete(`/productos/eliminar/${productoId}`);
        expect(response.status).toBe(200);
    });
});
