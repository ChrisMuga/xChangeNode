var express = require('express');
var router = express.Router();

var userController = require('../controllers/userController');

/* GET home page. */
router.get('/', function() {
  res.render('index', { title: 'X-Change' });
});
router.get('/register', userController.register );

module.exports = router;
