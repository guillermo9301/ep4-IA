const express = require('express');
const bodyParser = require('body-parser');
const clienteRoutes = require('./routes/clienteRoutes');
const productoRoutes = require('./routes/productoRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const ordenRoutes = require('./routes/ordenRoutes');
const detalleOrdenRoutes = require('./routes/detalleOrdenRoutes');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use('/clientes', clienteRoutes);
app.use('/productos', productoRoutes);
app.use('/categorias', categoriaRoutes);
app.use('/ordenes', ordenRoutes);
app.use('/detalles_orden', detalleOrdenRoutes); 

app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`);
});

