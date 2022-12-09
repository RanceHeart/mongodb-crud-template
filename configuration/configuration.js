const path = require("path");
require('dotenv').config({ path: path.join(__dirname, `../.env.${process.env.NODE_ENV}`)});

/* eslint no-process-env:0 */
module.exports.default = {

  env: process.env.NODE_ENV,
  url: `${process.env.HOST_NAME}:${process.env.PORT}`,
  logLevel: process.env.LOG_LEVEL,

  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT
  }
  // Grab everything in you .env file here
}
