const loginModel = require('../model/login')
const messageModel = require('../model/message')

exports.register = (req, res) => {
    try {
        req.body.messageCount = 0
        loginModel.create(req.body).then((data) => {
            res.status(200).send(data)
        })
    } catch (err) {

    }
}

exports.login = (req, res) => {
    try {
        loginModel.findOne({email : req.body.email}).then((data) => {
            if (data.password === req.body.password) {
                res.status(200).send(data)
            } else {
                res.status(401).send("incorrect password")
            }
        }).catch((e) => {
            res.status(401).send("incorrect email")
        })
    } catch (err) {
            res.status(401).send(err)
    }
}

exports.notification = async(req, res) => {
    try {
        const notificationData = {
            id : req.body.id ,
            count :  0
        }
        console.log(req.body);
        loginModel.findOne({_id : req.body.userid}).then(async(data) => {
            let notification = await data.message.findIndex((item) => item.id === req.body.id)
            if(notification !== -1 && notification !== undefined) {
                loginModel.updateOne(
                 {_id : req.body.userid , 'message.id' : req.body.id} ,
                 {$inc : {'message.$.count' : 1}}).then((result) => {
                    console.log(result);
                 }).catch((err) => {
                    console.log(err);
                 })
            } else {
                loginModel.updateOne({_id : req.body.userid} , {$push : {message : notificationData}}).then((data) => {
                }).catch((err) => {
                    console.log(err);
                })
            }
           loginModel.updateOne().catch((err) => {
            console.log(err);
            res.status(401).send(err)
           })
        }).catch((e) => {
            console.log(e);
            res.status(401).send("Not getting")
        })
    } catch (err) {
        console.log(err);
            res.status(401).send(err)
    }
}

exports.viewNotification = async(req, res) => {
    try {
        loginModel.findOne({_id : req.body.userid}).then(async(data) => {
            let notification = await data.message.findIndex((item) => item.id === req.body.id)
            if(notification !== -1 && notification !== undefined) {
                loginModel.updateOne(
                 {_id : req.body.userid , 'message.id' : req.body.id} ,
                 {$set : {'message.$.count' : 0}}).then((result) => {
                    console.log(result);
                 }).catch((err) => {
                    console.log(err);
                 })
            } 
        }).catch((e) => {
            console.log(e);
            res.status(401).send("Not getting")
        })
    } catch (err) {
        console.log(err);
            res.status(401).send(err)
    }
}

exports.users = ( req , res ) => {
    try {
        loginModel.find({_id : {$ne : req.body.userId}}).then((data) => {
            res.status(200).send(data)
        }).catch((err) => {
            res.status(401).send(err)
        })
    } catch (err) {
        res.status(401).send(err)
    }
}

exports.user = ( req , res ) => {
    try {
        loginModel.findOne({_id :  req.body.userId}).then((data) => {
            res.status(200).send(data)
        }).catch((err) => {
            res.status(401).send(err)
        })
    } catch (err) {
        res.status(401).send(err)
    }
}

exports.message = ( req , res ) => {
    try {
        console.log(req.body);
         messageModel.findOne({
             $or: [{
                 user1: req.body.user1,
                 user2: req.body.user2
             }, {
                 user1: req.body.user2,
                 user2: req.body.user1
             }]
         }).then((data) => {
             if (data) {
                messageModel.updateOne({
                    _id: data._id
                }, {
                    $push: 
                        {
                            message : req.body.message
                        }
                }).then((data) => {
                    res.status(200).send(data)
                }).catch((err) => {
                    res.status(401).send(err)
                })
             } else {
                messageModel.create({
                    user1 : req.body.user1 ,
                    user2 : req.body.user2 ,
                    message :   req.body.message
                }).then((data) => {
                    res.status(200).send(data)
                }).catch((err) => {
                    res.status(401).send(err)
                })
             }
         }).catch((err) => {
            res.status(401).send(err)
            console.log(err);
         })
    } catch (err) {
        res.status(401).send(err)
    }
}

exports.getMessage = ( req , res ) => {
    try {
        messageModel.findOne({
            $or:[ 
                {
                user1: req.query.user1,
                user2: req.query.user2
            } , {
                 user1: req.query.user2,
                 user2: req.query.user1
            }]
        }).then((data) => {
            res.status(200).send(data)
        }).catch((err) => {
            res.status(401).send(err)
        })
    } catch (err) {
        res.status(401).send(err)
    }
}

