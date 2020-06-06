const dotenv = require('dotenv').config();

const PORT = dotenv.parsed.PORT;
const MONGODB = dotenv.parsed.MONGODB;
const USERMAIL = dotenv.parsed.USERMAIL;
const PASSWORD = dotenv.parsed.PASSWORD;

module.exports = {
    PORT: PORT,
    MONGODB: MONGODB,
    USERMAIL: USERMAIL,
    PASSWORD: PASSWORD
}