var mongoose = require('mongoose')

var vehicleSchema = new mongoose.Schema({
	matricula: {type:String, required:true},
	computa: {type:Boolean, required:true}
});

module.exports = mongoose.model( 'Vehicles' , vehicleSchema)