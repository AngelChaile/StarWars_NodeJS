const express = require('express');
const aplicacion = express();
const axios = require('axios');
const path = require('path');

// Configura Express para servir archivos estáticos desd la misma carpeta que contiene 'index.js'.
aplicacion.use(express.static(__dirname));

// Ruta para obtener un listado de personajes
aplicacion.get('/personajes', async (req, res) => {
  try {
    const page = req.query.page || 1; // Página predeterminada: 1
    const limit = req.query.limit || 10; // Límite predeterminado: 10

    const response = await axios.get(`https://swapi.dev/api/people/?page=${page}&limit=${limit}`);
    const personajes = response.data.results; 

    res.json(personajes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los personajes' });
  }
});

// Ruta para obtener información de un planeta en particular
aplicacion.get('/planeta/:id', async (req, res) => {
  const planetId = req.params.id;

  try {
    const response = await axios.get(`https://swapi.dev/api/planets/${planetId}`);
    const planeta = response.data; 
    res.json(planeta);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener información del planeta' });
  }
});

const puerto = 8080; // Puerto disponible

aplicacion.listen(puerto, () => {
  console.log(`Aplicacion funcionando en el puerto ${puerto}`);
});
