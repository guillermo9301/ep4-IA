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


describe('Gestion de categorias', () => {
    let categoriaId;

    it('Debe crear una nueva categoria', async () => {
        const response = await request(app)
            .post('/categorias/nueva')
            .send({
                nombre: 'Categoria de prueba',
                descripcion: 'Descripcion de la categoria de prueba'
            });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id')
        categoriaId = response.body.id;
    });

    it('Debe obtener todas las categorías', async () => {
        const response = await request(app).get('/categorias');
        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body[0]).toHaveProperty('id_categoria');
        expect(response.body[0]).toHaveProperty('nombre');
        expect(response.body[0]).toHaveProperty('descripcion');
    });

    it('Debe actualizar una categoria', async () => {
        const response = await request(app)
            .put(`/categorias/editar/${categoriaId}`)
            .send({
                nombre: 'Nuevo nombre categoria',
                descripcion: 'Nueva descripcion categoria'
            });
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('nombre', 'Nuevo nombre categoria');
        expect(response.body).toHaveProperty('descripcion', 'Nueva descripcion categoria');
    });

    it('Debe eliminar una categoria', async () => {
        const response = await request(app).delete(`/categorias/eliminar/${categoriaId}`);
        expect(response.status).toBe(200);
    });
})