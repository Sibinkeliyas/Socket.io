const mongoose = require('mongoose')

const login = mongoose.Schema({
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    } ,
    message : {
        type : Array ,
        require : true
    }
});

const model = mongoose.model('users', login)

module.exports = model