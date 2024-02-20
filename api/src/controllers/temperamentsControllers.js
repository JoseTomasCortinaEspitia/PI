const { Temperament } = require('../db');
const axios = require('axios');

const getAllTemperaments = async () => {
  // Hacer una solicitud a la API para obtener todos los temperamentos de perros
  const response = await axios.get('https://api.thedogapi.com/v1/breeds');

  // Obtener temperamentos de todas las razas de perros
  const apiTemperamentsArray = response.data.reduce((temperaments, dogBreed) => {
    if (dogBreed.temperament) {
      const breedTemperaments = dogBreed.temperament.split(',').map((temperament) => temperament.trim());
      temperaments.push(...breedTemperaments);
    }
    return temperaments;
  }, []);

  // Eliminar duplicados y almacenar los temperamentos en la base de datos
  const uniqueTemperaments = [...new Set(apiTemperamentsArray)];
  await Promise.all(
    uniqueTemperaments.map(async (temperament) => {
      await Temperament.findOrCreate({
        where: { name: temperament },
        defaults: { name: temperament },
      });
    })
  );

  // Obtener los temperamentos guardados en la base de datos
  const dbTemperaments = await Temperament.findAll();

  // Obtener solo los nombres de los temperamentos
  const allTemperaments = dbTemperaments.map((temperament) => temperament.name);

  // Retornar los temperamentos combinados
  return allTemperaments;
};

module.exports = {
  getAllTemperaments
};