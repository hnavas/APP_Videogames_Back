const express = require('express');
const fn = require('../middlewares/funciones');
const router = express.Router();

router.get('/', async (req, res) => {
  const allPlatforms = await fn.getPlatfoms();
  allPlatforms ?
  res.status(200).json(allPlatforms) :
  res.status(404).send('No hay Platforms');
});

module.exports = router;