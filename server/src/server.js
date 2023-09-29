require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors")
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const routes = require("./routes/index.js");
const connectDB  = require("./config/db.js");
const errorHandler = require('./Middlewares/errorMiddelware.js');
const fillDatabase = require('./helpers/initializeDatabase.js');

const server = express();

server.use(cors());
server.use(express.json());
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

//DB
connectDB().then(() => {
  console.log('Conexión a la base de datos establecida.');
  // Llena la base de datos una vez
  return fillDatabase();
})
.then(() => {
  console.log('Base de datos inicializada correctamente.');
})
.catch((error) => {
  console.error('Error al iniciar la aplicación:', error.message);
});
//Errors
server.use(errorHandler);

module.exports = server;