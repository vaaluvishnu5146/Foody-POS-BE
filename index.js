const express = require('express')
const HTTP_SERVER = express();
const cors = require('cors');
const parser = require('body-parser');
const PORT = 5000;
const { initializeDB } = require("./database/config");


// INITIALIZE DB CONNECTION
initializeDB();

// PARSE INCOMING BODY AS JSON
HTTP_SERVER.use(parser.json())

// Enable CORS
HTTP_SERVER.use(cors())

HTTP_SERVER.use('/api/auth', require('./modules/Authetication/Authentication.controller'))
HTTP_SERVER.use('/api/food', require('./modules/Foods/Food.controller'))
HTTP_SERVER.use('/api/order', require('./modules/Orders/Orders.controller'))

HTTP_SERVER.listen(PORT, "0.0.0.0", () => {
    console.log("Server started at", PORT)
})