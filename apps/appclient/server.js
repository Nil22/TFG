var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var mongoose = require('mongoose')
var exphbs = require('express-handlebars')
var session = require('express-session')
let cors = require('cors')
//var download = require('download-file')
var admin = require('./routes/admin')
var multer = require('multer')
var index = require('./routes/index')
//var computacio = require('./routes/computacio')
var users = require('./routes/users')
var bodyParser = require('body-parser')
var vehicles = require('./routes/vehicles')
var testbed = require('./routes/testbed')
var ip = require("ip")


// Inicialitzacions
var app = express()
require('./database')

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.options('*', cors());
app.use(cors());

// Settings
app.set('port', process.env.PORT || 8080)
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', exphbs({
	defaultLayout: 'main',
	layoutsDir: path.join(app.get('views'), 'layouts'),
	partialsDir: path.join(app.get('views'), 'partials'),
	extname: '.hbs'
}));
app.set('view engine', '.hbs')

// Middlewares
app.use(session({
	secret: 'perro',
	resave: true,
	saveUninitialized: true
}));

// Routes
app.use('/', index)
app.use('/admin', admin)
app.use('/vehicles', vehicles)
//app.use('/upload', computacio)
app.use('/testbed', testbed)


// Static files
app.use(express.static(path.join(__dirname, 'public')))

// 404 error i pasem al error handler
app.use(function(req, res, next){
	var err = new Error('Not Found')
	err.status = 404
	next(err)
});

// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})
 
var upload = multer({ storage: storage })

app.post('/uploadfile', upload.single('myFile'), (req, res, next) => {
  const file = req.file
  if (!file) {
    const error = new Error('Please upload a file')
    error.httpStatusCode = 400
    return next(error)
  }
    res.send(file)
  
})

const PORT = 3002;
const HOST = ip.address();

app.listen(PORT, HOST, function() {
  console.log('Escoltant al port 3002')
  console.log(`Running on http://${HOST}:${PORT}`);
});

module.exports = app
