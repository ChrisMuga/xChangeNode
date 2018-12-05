var express = require('express');
var router = express.Router();

var userController = require('../controllers/userController');

/* GET home page. */
router.get('/', userController.index);
router.post('/register', userController.register );

module.exports = router;
