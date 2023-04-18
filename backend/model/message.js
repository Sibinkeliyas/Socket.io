const mongoose = require('mongoose')

const message = mongoose.Schema({
    user1 : {
        type : mongoose.Types.ObjectId ,
        require : true
    } ,
    user2: {
        type: mongoose.Types.ObjectId,
        require: true
    },
    message : {
        type : Array ,
        require : true
    }
})

const model = mongoose.model("message" , message)
module.exports = model