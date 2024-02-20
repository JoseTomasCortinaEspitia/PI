const { Router } = require("express");
const dogsRouter = Router();

//requiero los handlers
//el Handler se encarga de recibir la request, unificar datos y devolver la respuesta
//el Handler invoca al controller --->>> el Hanldles no interactua con fuentes externas(API y BDD)
//el controller no es mas que otra función que interactua con el Handler
const {getDogByIdHandler, getDogByNameHandler, postDogHandler} = require("../handlers/dogsHandlers");

//GET
dogsRouter.get('/', getDogByNameHandler);//por esta ruta traigo a todos lo perros , y tambien traigo por query , recuerden que la query no me cambia la ruta

dogsRouter.get('/:idRaza', getDogByIdHandler);

//POST
dogsRouter.post('/', postDogHandler)

module.exports = dogsRouter