const express = require('express');
const db = require('../app');  
const router = express.Router();


router.post('/crear', (req, res) => {
    const { nombre, descripcion, precio, stock, imagen, categoria } = req.body;
    const query = 'INSERT INTO panes (nombre, descripcion, precio, stock, imagen, categoria) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [nombre, descripcion, precio, stock, imagen, categoria], (err, result) => {
        if (err) throw err;
        res.redirect('/inventario');
    });
});


router.get('/', (req, res) => {
    const query = 'SELECT * FROM panes';
    db.query(query, (err, results) => {
        if (err) throw err;
        res.render('inventario', { panes: results });
    });
});

// Actualizar pan
router.post('/editar/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, precio, stock, imagen, categoria } = req.body;
    const query = 'UPDATE panes SET nombre = ?, descripcion = ?, precio = ?, stock = ?, imagen = ?, categoria = ? WHERE id = ?';
    db.query(query, [nombre, descripcion, precio, stock, imagen, categoria, id], (err, result) => {
        if (err) throw err;
        res.redirect('/inventario');
    });
});

// Eliminar pan
router.post('/eliminar/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM panes WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) throw err;
        res.redirect('/inventario');
    });
});

module.exports = router;
