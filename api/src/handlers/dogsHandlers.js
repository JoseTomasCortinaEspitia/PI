//Mis handlers
//el Handler se encarga de recibir la request, unificar datos y devolver la respuesta
//el Handler invoca al controller --->>> el Hanldles no interactua con fuentes externas(API y BDD)
//el controller no es mas que otra función que interactua con el Handler

//Requiero mis controllers
const { createDogWithTemperamentsDB, getDogById, getDogByName, getAllDogs } = require('../controllers/dogsControllers');


//obtiene la infor por query
const getDogByNameHandler = async (req, res) => {
    //console.log(req.query)
    const {name}= req.query
    try {// try catch por que siempre el servidor debe dar una respuesta sea positiva o negativa
        if(name){
            const response = await getDogByName(name)
            res.status(200).send(response);
        } else{
            const response = await getAllDogs()
            res.status(200).send(response);
        }
        
    } catch (error) {
        res.status(400).json({error: error.message})
    }  
};

//obtiene la infor por params
const getDogByIdHandler = async (req, res) => {
    //console.log(req.params.idRaza)
    const { idRaza } = req.params
    const source = isNaN(idRaza) ? 'bdd' : 'api'; // si el idRaza no es un numero, la fuente es la bdd.
    try {
        const response = await getDogById(idRaza, source)
        res.status(200).send(response);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};

//obtiene la infor por body
const postDogHandler = async (req, res) => {
    const { name, height, weight, years, image, temperaments } = req.body;

    try {
        const response = await createDogWithTemperamentsDB(name, height, weight, years, image, temperaments);

        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message });

    }
};

module.exports = { getDogByNameHandler, getDogByIdHandler,postDogHandler};