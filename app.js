const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'n0m3l0',
    database: 'panaderia'
});

db.connect((err) => {
    if (err) {
        console.error('Error de conexión a MySQL:', err);
    } else {
        console.log('Conectado a MySQL');
    }
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');


const inventarioRoutes = require('./routes/inventario');
app.use('/inventario', inventarioRoutes);

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});

module.exports = db;  
