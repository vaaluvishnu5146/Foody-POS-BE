const mongoose = require('mongoose');

const URI = 'mongodb://localhost:27017';

function initializeDB() {
    mongoose.connect(URI).then((response) => {
        if(response) console.log('Mongodb connection successful')
    }).catch((error) => console.log(error))
}

module.exports = {
    initializeDB
}