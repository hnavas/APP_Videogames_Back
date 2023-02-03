const express = require('express');
const fn = require('../middlewares/funciones');
const { Videogame, Genre } = require('../db');
const router = express.Router();

router.get('/', async (req, res) => {
  const {name} = req.query;
  let allVideogames = await fn.getAllVideogames();
  if(name) {
      let filteredByName =  allVideogames.filter(vg => vg.name.toLowerCase().includes(name.toLowerCase()));
      
      filteredByName.length ? res.status(200).json(filteredByName) :
      res.send().status(404);
  } else {
    res.status(200).json(allVideogames);
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  let findedGame = await fn.filterById(id);
  if(!findedGame) return res.status(404).send('Videogame not finded');
  res.status(200).json(findedGame);
});

router.post('/', async (req, res) => {
  const { name, description, released, rating, platforms, genre, image  } = req.body;
  if(!name || !description || !platforms) return res.status(404).send('Faltan datos obligatorios');
  try {
    const [videogameCreated, status] = await Videogame.findOrCreate({
      where: {name: name},
      defaults: {
        name,
        description,
        image,
        released,
        rating,
        platforms
      }
    });
    const genreBD = await Genre.findAll({
      where: { 
         name: genre 
        }
    }); 
    videogameCreated.addGenre(genreBD);
    if(status) res.status(200).send('Videogame created successfully ')
    // res.status(200).send('The video game was not created, the name already exists. ')
  } catch (error) {
    console.log(error)
  } 
});

module.exports = router;