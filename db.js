const mongoose = require('mongoose');
require("dotenv").config()
const mongoURL = process.env.MONGODB_URL_LOCAL;
mongoose.connect(mongoURL)

module.exports = mongoose.connection;
