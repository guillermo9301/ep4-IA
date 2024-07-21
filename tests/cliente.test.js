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


describe('Gestion de clientes', () => {
    let clienteId

    it('Debe crear un nuevo cliente', async () => {
        const response = await request(app)
            .post('/clientes/nuevo')
            .send({
                nombre: "Cliente de prueba",
                correo: "correprueba@correo.com",
                telefono: "988845120",
                direccion: "direccion de prueba"
            });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id')
        clienteId = response.body.id
    });

    it('Debe obtener detalles del cliente', async () => {
        const response = await request(app).get(`/clientes/${clienteId}`);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('nombre', 'Cliente de prueba');
    });

    it('Debe actualizar el cliente', async () => {
        const response = await request(app)
            .put(`/clientes/editar/${clienteId}`)
            .send({
                telefono: "008005974",
                direccion: "edit direccion de prueba",
            });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('telefono', "008005974");
        expect(response.body).toHaveProperty('direccion', "edit direccion de prueba");
    });

    it('Debe eliminar el cliente', async () => {
        const response = await request(app).delete(`/clientes/eliminar/${clienteId}`);
        expect(response.status).toBe(200);
    });

})