const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const getDogs = require('../controllers/getDogs');
const getDogById = require('../controllers/getDogById');
const getDogByName = require('../controllers/getDogByName');

//-------------------------------------------------------
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/dogs", (req,res) => {
    try {
        
    } catch (error) {
        res.status(500).send(error.message)
    }
});
router.get("/dogs/:id", (req,res) => {
    try {
        
    } catch (error) {
        res.status(500).send(error.message)
    }
});
router.get("/dogs?name=", (req,res) => {
    try {
        
    } catch (error) {
        res.status(500).send(error.message)
    }
});

module.exports = router;
