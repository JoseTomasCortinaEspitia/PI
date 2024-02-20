//aca se monta el servidor con express y se exporta para ser escuchado desde index.js
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');//morgan me permite ver en el console las peticiones entrantes
const routes = require('./routes/index.js'); //se modularizan las rutas

require('./db.js'); //requerir un modulo de esta manera hace que se ejecute

const server = express();

//estos son Middlewares 
server.use(morgan('dev'));//morgan es para ver la peticiones(get,post, etc) en consola.
server.use(express.json());//express.json() es para que la api se pueda leer los datos


server.name = 'API';

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use('/', routes);

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
