const {Dog} = require('../db.js');

const findAllDogs = async () => {
    const dogs = await Dog.findAll();
    return dogs
}

module.exports = findAllDogs