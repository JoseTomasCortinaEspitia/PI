//requerimos DataTypes para darles tipos de datos a mis modelos
const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('Temperament', {
        id: {
            type: DataTypes.UUID,
            defaultValue: () => uuidv4(),
            primaryKey: true,
            allowNull: false
          },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    { timestamps: false });
};