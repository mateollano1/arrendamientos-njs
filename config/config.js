const dotenv = require('dotenv').config();

const PORT = dotenv.PORT;
const MONGODB = dotenv.MONGODB;
const USERMAIL = dotenv.USERMAIL;
const PASSWORD = dotenv.PASSWORD;

module.exports = {
    PORT: PORT,
    MONGODB: MONGODB,
    USERMAIL: USERMAIL,
    PASSWORD: PASSWORD
}