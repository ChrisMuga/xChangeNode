var express = require('express');
var router = express.Router();

var userController = require('../controllers/userController');

/* GET home page. */
router.get('/', userController.index);
router.post('/api/register', userController.register );
router.get('/hash', userController.hash);
router.get('/signin', userController.signin);
router.post('/api/user-auth', userController.userAuth);
module.exports = router;
