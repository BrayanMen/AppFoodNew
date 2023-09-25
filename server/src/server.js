require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors")
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const routes = require("./routes/index.js");
const connectDB  = require("./config/db.js");
const errorHandler = require('./Middlewares/errorMiddelware.js');

const server = express();

server.use(cors());
server.use(express.json());

server.use('/', routes);

//DB
connectDB();

//Errors
server.use(errorHandler);

module.exports = server;