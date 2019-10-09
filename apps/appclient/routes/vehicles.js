var express = require('express')
var router = express.Router()
var Vehicle = require('../models/vehicles')


router.get('/', async (req, res) => {
	var listVehicles = await Vehicle.find()
	res.render('vehicles/listvehicles')
	//res.render('vehicles/listvehicles', { listVehicles })
});

module.exports = router