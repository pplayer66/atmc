const mongoose = require('mongoose');

const {dbport: port} = require('../config/db');

mongoose.connect(port, {useMongoClient: true});

module.exports = mongoose;