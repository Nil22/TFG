var express = require('express')
var router = express.Router()
var mongo = require('mongodb');
var ip = require("ip");
var assert = require('assert')
const multer = require('multer');


function httpPost(theUrl, data)
{
	var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
  	var xhttp = new XMLHttpRequest();
  	xhttp.open("POST", theUrl, true);
  	xhttp.setRequestHeader("Content-type", "text/plain");
  	xhttp.send(data);
}

function change(filename, version, pp){
	var text = "\""+ filename+  "\"";
	var versionn = "\""+ version+  "\""; 
	var ppp = "\""+ pp+  "\""; 
	data = '{ "paralel" : ' + ppp + ', "version" : ' + versionn + ', "estat" : "Pendent", "nom_fitxer" : ' + text + ' }'
	//console.log(data)
	httpPost('http://0.0.0.0:8000/gestio_computacio', data)
	//console.log('peticio feta')
}


var upload = multer({ dest: __dirname + '/uploads/', storage : multer })

const multerConf = {
	storage: multer.diskStorage({
		destination : function(req, file, next){
			next(null,'/.public/images');
		},
		filename: function(req, file, cb){
			cb(null, Date.now() + '.jpg') //Appending .jpg			
			console.log(file);
		}
	}),
};


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/uploads/')
  },
  filename: function (req, file, cb) {
    cb( null, file.originalname);
  }
})

var upload = multer({ storage: storage });



router.post('/upload', upload.single('image'), function (req, res, next) {
	//console.log("requestbody", req.body['txtVersion'])
	//console.log("requestbody", req.body['txtPP'])
    //console.log(req.file.originalname);
    nom = req.file.originalname.toString();
    change(nom, req.body['txtVersion'], req.body['txtPP'])
    //res.status(200).send("file uploaded");
    res.redirect('back')
});

router.get('/upload', function(req, res, next){
	console.log("requestbody", req)
	mongoClient.connect(url, function(err, db){
		console.log(req)
		if(err){
			console.log('Unable to connect', err);
		}
		else {
			console.log('Connected to MongoDB');
			var collection = db.collection('fitxers');
			collection.find({}).toArray(function(err, result){
				if(err){
					res.send(err);
				}
				else if (result.length){
					res.render('fitxers', { "listfitxers" : result });
				}
				else {
					res.send('No hi han vehicles')
				}
			})
		}
	})
});

router.get('/download_file/:id', function(req, res, next){
	console.log(req.params.id)
	console.log("requestbody")
	res.download('/'+req.params.id, req.params.id)
});

router.post('/download_file', function(req, res, next){
	console.log("requestbody")
	console.log("El body es")
	console.log(req.body)
	res.download('/home/aerie/cosesquenecessitem.txt', 'cosesquenecessitem.txt')
});

var mongoClient = mongo.MongoClient;

var url = 'mongodb://localhost:27017/NSP';

router.get('/', function(req, res, next){
	res.render('index')
});


router.get('/llista_vehicles', function(req, res, next){
	mongoClient.connect(url, function(err, db){
		if(err){
			console.log('Unable to connect', err);
		}
		else {
			console.log('Connection established');
			var collection = db.collection('vehicles');
			collection.find({}).toArray(function(err, result){
				if(err){
					res.send(err);
				}
				else if (result.length){
					res.render('llista', { "listvehicles" : result });
				}
				else {
					res.send('No hi han vehicles')
				}
			})
		}
	})
});

router.get('/dashboards', function(req, res, next){
	res.render('dashboards')
})

router.get('/computacio', function(req, res, next){
	mongoClient.connect(url, function(err, db){
		if(err){
			console.log('Unable to connect', err);
		}
		else {
			console.log('Connection established');
			var collection = db.collection('fitxers');
			collection.find({}).toArray(function(err, result){
				if(err){
					res.send(err);
				}
				else if (result.length){
					res.render('computacio', { "listfitxers" : result });
				}
				else {
					res.send('No hi han vehicles')
				}
			})
		}
	})
});

module.exports = router