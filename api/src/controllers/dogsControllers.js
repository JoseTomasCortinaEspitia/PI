const { Dog, Temperament } = require('../db');
const axios = require('axios');
const { infoClean } = require('../utils/index');

//Funcion GET
 const getAllDogs = async () => {
     const dogsDB = await Dog.findAll({
         include: Temperament
     })
     const infoApi = (await axios.get('https://api.thedogapi.com/v1/breeds')).data
     const dogsApi = infoClean(infoApi)
     return [...dogsDB, ...dogsApi] //concatena los dos arrays
 };

const getDogByName = async (name) => {
    const infoApi = (await axios.get('https://api.thedogapi.com/v1/breeds')).data
    //console.log(infoApi)
    const dogsApi = infoClean(infoApi)
    //console.log(dogsApi)
    const dogFilterByNameAPI = dogsApi.filter(dog => dog.name === name)  //El metodo filter() crea un nuevo arreglo con todos los elementos que cumplan la condición implementada por la función de prueba.
    const dogFilterByNameDB = await Dog.findAll({
        where: {
            name: name
        },
        include: Temperament
    })
    return [...dogFilterByNameDB, ...dogFilterByNameAPI] 
}

const getDogById = async (id, source) => {
    if (source === 'api') {
        const dog = (await axios.get(`https://api.thedogapi.com/v1/breeds/${id}`)).data
        return dog
    } else{
        const dog = await Dog.findByPk(id, {
            include: {
                model: Temperament,
                attributes: ['name']
            }
        })
        return dog
    };
}

//Funcion POST
const createDogWithTemperamentsDB = async (name, height, weight, years, image, temperaments) => {
    return Dog.create({ //create es un metodo de sequelize
        name,
        height,
        weight,
        years,
        image,
        Temperaments: temperaments ? temperaments.map((temperament) => ({ name: temperament })) : [],
    }, {
        include: Temperament, // Aquí se utiliza directamente el modelo Temperament como la asociación
    });
};

module.exports = {
    createDogWithTemperamentsDB,
    getDogById,
    getDogByName,
    getAllDogs
};