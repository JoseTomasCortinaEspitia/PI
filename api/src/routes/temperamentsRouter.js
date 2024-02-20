const { Router } = require("express");
const temperamentsRouter = Router();

//requiero los handlers
const {temperamentsHandler} = require("../handlers/temperamentsHandler");

//GET
temperamentsRouter.get("/", temperamentsHandler)
  
module.exports = temperamentsRouter