const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const routes = require('./routes')
const db = require('./database')
const config = require('./config')
const mongoose = require('mongoose')

const server = express()

server.use(morgan('tiny'));
server.use(express.json());
server.use(cors());

server.use('/', routes);


db.connect()
const { connection } = mongoose;
connection.on('error', error => {
  console.error('Failed to connect to the database');
  throw error;
});

server.listen(config.port, () => {
  console.log('Server running on port', config.port);
})
