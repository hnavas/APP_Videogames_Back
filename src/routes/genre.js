const express = require('express');
const fn = require('../middlewares/funciones');
const { Videogame, Genere } = require('../db')
const router = express.Router();

router.get('/', async (req, res) => {
  const allGenresDB = await fn.getAllGenres();
  allGenresDB ?
  res.status(200).json(allGenresDB) :
  res.status(404).send('No hay Genres');
});

module.exports = router;