/* Admin page routes */


var express = require('express')
var router = express.Router()
var cors = require('cors')
var multer = require('multer')

var uploading = multer({
  dest: '../public/uploads/',
  limits: {fileSize: 1000000, files:1},
})



module.exports = router