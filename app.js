const express = require('express');
const pool = require('./config/db');
const app = express();
const cors = require('cors');
const port = 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('¡Hola Mundo desde Express!');
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});

//METODOS PARA PRODUCTOS (GET, POST, PUT, DELETE) (OBTENERLOS, CREARLOS, ACTUALIZARLOS Y ELIMINARLOS)

app.get('/productos', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Productos');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener los productos');
    }
});

app.post('/productos', async (req, res) => {
    const { nombre, descripcion, categoria_id, precio, stock, proveedor_id, fecha_ingreso } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO Productos (nombre, descripcion, categoria_id, precio, stock, proveedor_id, fecha_ingreso) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
            [nombre, descripcion, categoria_id, precio, stock, proveedor_id, fecha_ingreso]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al agregar el producto');
    }
});

app.put('/productos/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, categoria_id, precio, stock, proveedor_id, fecha_ingreso } = req.body;
    try {
        const result = await pool.query(
            'UPDATE Productos SET nombre = $1, descripcion = $2, categoria_id = $3, precio = $4, stock = $5, proveedor_id = $6, fecha_ingreso = $7 WHERE producto_id = $8 RETURNING *',
            [nombre, descripcion, categoria_id, precio, stock, proveedor_id, fecha_ingreso, id]
        );
        if (result.rowCount === 0) {
            return res.status(404).send('Producto no encontrado');
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al actualizar el producto');
    }
});

app.delete('/productos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM Productos WHERE producto_id = $1 RETURNING *', [id]);
        if (result.rowCount === 0) {
            return res.status(404).send('Producto no encontrado');
        }
        res.send('Producto eliminado exitosamente');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al eliminar el producto');
    }
});


//METODOS PARA CLIENTES (GET, POST, PUT, DELETE) (OBTENERLAS, CREARLAS, ACTUALIZARLAS Y ELIMINARLAS)

app.get('/clientes', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Clientes');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener los clientes');
    }
});

app.post('/clientes', async (req, res) => {
    const { nombre, contacto, direccion, telefono, correo } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO Clientes (nombre, contacto, direccion, telefono, correo) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [nombre, contacto, direccion, telefono, correo]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al agregar el cliente');
    }
});

app.put('/clientes/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, contacto, direccion, telefono, correo } = req.body;
    try {
        const result = await pool.query(
            'UPDATE Clientes SET nombre = $1, contacto = $2, direccion = $3, telefono = $4, correo = $5 WHERE cliente_id = $6 RETURNING *',
            [nombre, contacto, direccion, telefono, correo, id]
        );
        if (result.rowCount === 0) {
            return res.status(404).send('Cliente no encontrado');
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al actualizar el cliente');
    }
});

app.delete('/clientes/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM Clientes WHERE cliente_id = $1 RETURNING *', [id]);
        if (result.rowCount === 0) {
            return res.status(404).send('Cliente no encontrado');
        }
        res.send('Cliente eliminado exitosamente');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al eliminar el cliente');
    }
});

//METODOS PARA PROVEEDORES (GET, POST, PUT, DELETE) (OBTENERLOS, CREARLOS, ACTUALIZARLOS Y ELIMINARLOS)

app.get('/proveedores', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Proveedores');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al obtener los proveedores');
    }
});

app.post('/proveedores', async (req, res) => {
    const { nombre, contacto, direccion, telefono, correo } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO Proveedores (nombre, contacto, direccion, telefono, correo) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [nombre, contacto, direccion, telefono, correo]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al agregar el proveedor');
    }
});

app.put('/proveedores/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, contacto, direccion, telefono, correo } = req.body;
    try {
        const result = await pool.query(
            'UPDATE Proveedores SET nombre = $1, contacto = $2, direccion = $3, telefono = $4, correo = $5 WHERE proveedor_id = $6 RETURNING *',
            [nombre, contacto, direccion, telefono, correo, id]
        );
        if (result.rowCount === 0) {
            return res.status(404).send('Proveedor no encontrado');
        }
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al actualizar el proveedor');
    }
});

app.delete('/proveedores/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM Proveedores WHERE proveedor_id = $1 RETURNING *', [id]);
        if (result.rowCount === 0) {
            return res.status(404).send('Proveedor no encontrado');
        }
        res.send('Proveedor eliminado exitosamente');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al eliminar el proveedor');
    }
});

//M

