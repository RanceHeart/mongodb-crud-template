const mongoose = require('mongoose')
const path = require("path");
const config = require('../configuration/configuration')
require('dotenv').config({ path: path.join(__dirname, `../.env.${config.env}`)});

mongoose.connect(`mongodb://${config.db.host}:${config.db.port}/test`)

const userSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: String,
  date: {type: Date, default: Date.now}
}, {collection: 'user-data'})

const userModel = mongoose.model("userModel", userSchema);

module.exports = userModel
