const request = require('supertest');
const app = require('../src/index');
const db = require('../src/config/db');

let server;
let clienteId;
let productoId;
let ordenId;
let detalleOrdenId;

beforeAll(async () => {
    server = app.listen(8000, () => {
        console.log('Servidor de pruebas iniciado en el puerto 8000');
    });

    // Crear cliente para las pruebas de detalleOrden
    const clienteResponse = await request(app)
        .post('/clientes/nuevo')
        .send({
            nombre: 'Cliente de prueba',
            correo: 'cliente@prueba.com',
            telefono: '123456789',
            direccion: 'Direccion de prueba'
        });
    clienteId = clienteResponse.body.id;

    // Crear producto para las pruebas de detalleOrden
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

    // Crear orden para las pruebas de detalleOrden
    const ordenResponse = await request(app)
        .post('/ordenes/nueva')
        .send({
            id_cliente: clienteId,
            estado: 'pendiente',
            productos: [
                { id_producto: productoId, cantidad: 2, precio: 99.99 }
            ]
        });
    ordenId = ordenResponse.body.id;
});

afterAll(async () => {
    await new Promise(resolve => server.close(resolve));
    console.log('Servidor de pruebas cerrado');
    await db.close(); // Cerrar la conexión a la base de datos
});


describe('Gestión de Detalles de Órdenes', () => {
    it('Debe crear un nuevo detalle de orden', async () => {
        const response = await request(app)
            .post('/detalles_orden/nueva')
            .send({
                id_orden: ordenId,
                id_producto: productoId,
                cantidad: 2,
                total: 199.98
            });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id');
        detalleOrdenId = response.body.id;
    });

    it('Debe obtener un detalle de orden por el ordenID', async () => {
        const response = await request(app).get(`/detalles_orden/${ordenId}`);
        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0); // Verifica que hay al menos un detalle de orden
        const detalleOrden = response.body[0]; // Obtén el primer objeto del array
        expect(detalleOrden).toHaveProperty('id_detalle', detalleOrdenId);
        expect(detalleOrden).toHaveProperty('id_orden', ordenId);
        expect(detalleOrden).toHaveProperty('id_producto', productoId);
        expect(detalleOrden).toHaveProperty('cantidad', 2); // Ajusta según tus datos de prueba
        expect(detalleOrden).toHaveProperty('total', '199.98'); // Ajusta según tus datos de prueba
    });


    it('Debe actualizar un detalle de orden', async () => {
        const response = await request(app)
            .put(`/detalles_orden/editar/${detalleOrdenId}`)
            .send({
                cantidad: 3,
                total: 299.97
            });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('cantidad', 3);
        expect(response.body).toHaveProperty('total', 299.97);
    });

    it('Debe eliminar un detalle de orden', async () => {
        const response = await request(app).delete(`/detalles_orden/eliminar/${detalleOrdenId}`);
        expect(response.status).toBe(200);
    });
});
