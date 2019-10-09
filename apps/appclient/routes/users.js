var express = require('express')
var router = express.Router()


router.get('/signin', function(req, res, next){
	res.send('Sign in app')
});


router.get('/signup', function(req, res, next){
	res.send('Sign up app')
});

module.exports = router