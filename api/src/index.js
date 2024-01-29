const server = require('./app');
const PORT = 3001;
const { conn } = require('./db.js');

conn.sync({ force: true }).then(() => {
    server.listen(PORT, () => {
        console.log('Server raised in port: ' + PORT);
    }); 
    }).catch((error)=>{
        console.log(error.message)
    });