//aca se importa el server para escucharlo, tambien se levanta la base de datos
//Requerimos el servidor
const server = require('./app');

//puerto de comunicación entre el front y el back
const PORT = 3001;

//requerimos la conexión con a la base de datos
const { conn } = require('./db.js');

//primero levantamos la base de datos, luego levantamos el servidor
//el servidor se encuentra levantado, activo, escuchando por el puerto
conn.sync({ force: true }).then(() => {
    server.listen(PORT, () => {
        console.log('Server raised in port: ' + PORT);
    }); 
    }).catch((error)=>{
        console.log(error.message)
});