const multer = require('multer');
const path = require("path");

const storage = multer.diskStorage({
	destination: function (request, file, callback) {
	  callback(null, './public/uploads');
	},
	filename: function (request, file, callback) {
	  callback(null, Date.now() + file.originalname);
	},
  });
  
  //upload parameters for multer
  module.exports = multer({
	storage: storage,
	limits: {
	  fieldSize: 1024 * 1024 * 3,
	},
  })