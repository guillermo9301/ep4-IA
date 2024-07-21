const request = require('supertest');
const app = require('../src/index');
const db = require('../src/config/db');

let server;
let clienteId;
let productoId;
let ordenId;

beforeAll(async () => {
    server = app.listen(8000, () => {
        console.log('Servidor de pruebas iniciado en el puerto 8000');
    });

    // Crear cliente para las pruebas de orden
    const clienteResponse = await request(app)
        .post('/clientes/nuevo')
        .send({
            nombre: 'Cliente de prueba',
            correo: 'cliente@prueba.com',
            telefono: '123456789',
            direccion: 'Direccion de prueba'
        });
    clienteId = clienteResponse.body.id;

    // Crear producto para las pruebas de orden
    const productoResponse = await request(app)
        .post('/productos/nuevo')
        .send({
            nombre: 'Producto de prueba',
            descripcion: 'Descripción del producto de prueba',
            precio: 99.99,
            stock: 10,
            id_categoria: 2
        });
    productoId = productoResponse.body.id;
});

afterAll(async () => {
    await new Promise(resolve => server.close(resolve));
    console.log('Servidor de pruebas cerrado');
    await db.close(); // Cerrar la conexión a la base de datos
});


describe('Gestión de Órdenes', () => {
    it('Debe crear una nueva orden', async () => {
        const response = await request(app)
            .post('/ordenes/nueva')
            .send({
                id_cliente: clienteId,
                estado: 'pendiente',
                productos: [
                    { id_producto: productoId, cantidad: 2, precio: 99.99 }
                ]
            });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id');
        ordenId = response.body.id;
    });

    it('Debe obtener una orden por su ID', async () => {
        const response = await request(app).get(`/ordenes/${ordenId}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id_orden', ordenId);
        expect(response.body).toHaveProperty('id_cliente', clienteId);
    });

    it('Debe actualizar el estado de una orden', async () => {
        const response = await request(app)
            .put(`/ordenes/editar/${ordenId}`)
            .send({
                estado: 'enviado'
            });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('estado', 'enviado');
    });

    it('Debe eliminar una orden', async () => {
        const response = await request(app).delete(`/ordenes/eliminar/${ordenId}`);
        expect(response.status).toBe(200);
    });
});


