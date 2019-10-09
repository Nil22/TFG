/* Admin page routes */


var express = require('express')
var router = express.Router()


// localhost:8080/admin
router.get('/', function(req, res, next){
	res.render('testbed/testbed')
});


module.exports = router