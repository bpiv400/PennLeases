var express = require('express');
var termOptions = require('../data/mongo').possTerms;
var conn = require('../data/mongo').conn;
var mongoose = require('../data/mongo').mongoose;
var router = express.Router();
var listingDb = require('../data/listings');
var multer = require('multer');
var GridFsStorage = require('multer-gridfs-storage');


/*var Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;

var gfs = Grid(conn.db);
*/
var storage = new GridFsStorage({
    url: 'mongodb://127.0.0.1:27017/penn-leases',
    filename: function (req, file, cb) {
       var datetimestamp = Date.now();
       cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
    },
    metadata: function(req, file, cb) {
      cb(null, { originalname: file.originalname });
    },
    root: 'photos' //root name for collection to store files into
});

var upload = multer({
  storage: storage
}).array('photo');

router.use('/', upload);

router.get('/', function(req, res, next) {
  res.render('create', {possTerms : termOptions});
});

router.post('/', function(req, res, next) {
  var term = req.body.term;
  var streetNumber = req.body.streetNumber;
  var unit = req.body.unit;
  var street = req.body.street.trim();
  var zip = req.body.zip.trim();
  var housingType = req.body.housingType;
  var buildingName = req.body.buildingName;
  var beds = req.body.beds;
  var baths = req.body.baths;
  var occupancy = req.body.occupancy;
  var size = req.body.size;
  var price = req.body.price;
  var furnished = new Boolean(req.body.furnished);
  var description = req.body.description;
  var files = req.files;
  console.log(typeof files);
  var listingData = {
    housingType: housingType,
    term: term,
    price: price,
    beds: beds,
    baths: baths,
    occupancy: occupancy,
    furnished: furnished,
    address: {
      streetNumber: streetNumber,
      street: street,
      zip: zip,
    },
  };
  if (size) {
    listingData.size = size;
  }
  if (description) {
    listingData.description = description.trim();
  }
  if (buildingName) {
    listingData.buildingName = buildingName.trim();
  }
  if (unit) {
    listingData.address.unit = unit.trim();
  }
  if (files) {
    var photos = new Array();
    for(var i = 0; i < files.length; i++) {
      photos.push(files[0].id);
    }
    listingData.photos = photos;
  }

  listingDb.addListing(listingData, function(err) {
    if(err) {
      next(err);
    } else {
      res.send('Listing added successfully!');
    }
  });
});

module.exports = router;
