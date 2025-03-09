const express = require('express');
const axios = require('axios');
const path = require('path');

// Configura Express para servir archivos estáticos desd la misma carpeta que contiene 'index.js'.
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Ruta para obtener un listado de personajes
app.get('/personajes', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const response = await axios.get(`https://swapi.dev/api/people/?page=${page}`);
        res.json(response.data.results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los personajes' });
    }
});

// Ruta para obtener información de un planeta en particular
app.get('/planeta/:id', async (req, res) => {
    try {
        const response = await axios.get(`https://swapi.dev/api/planets/${req.params.id}`);
        res.json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener información del planeta' });
    }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
