var express = require('express');
var router = express.Router();
const controller = require('../controller/controller')

/* GET home page. */
router.post('/register', controller.register)

router.post('/login', controller.login)

router.post('/', controller.users)

router.post('/user', controller.user)

router.post('/notification' , controller.notification)

router.post('/viewnotification' , controller.viewNotification)

router.post('/message' , controller.message)

router.get('/message', controller.getMessage)

module.exports = router;
