const mongoose = require('mongoose')
const path = require("path");
require('dotenv').config({ path: path.join(__dirname, `../.env.${process.env.NODE_ENV}`)});


const MONGODB_URL = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}`;
mongoose.connect(`${MONGODB_URL}/test`)

const userSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: String,
  date: {type: Date, default: Date.now}
}, {collection: 'user-data'})

const userModel = mongoose.model("userModel", userSchema);

module.exports = userModel
