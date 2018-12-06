var express = require('express');
var router = express.Router();

var userController = require('../controllers/userController');

/* GET home page. */
router.get('/', userController.index);
router.post('/register', userController.register );
router.get('/hash', userController.hash);
router.get('/signin', userController.signin);
router.post('/user-auth', userController.userAuth);
module.exports = router;
