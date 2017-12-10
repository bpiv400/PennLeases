var express = require('express');
var termOptions = require('../data/mongo').possTerms;
var conn = require('../data/mongo').conn;
var mongoose = require('../data/mongo').mongoose;
var router = express.Router();
var listingDb = require('../data/listings');
var fileUpload = require('express-fileupload');
var fs = require('fs');


/*var Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;

var gfs = Grid(conn.db);
*/
// var storage = new GridFsStorage({
//     url: 'mongodb://127.0.0.1:27017/penn-leases',
//     filename: function (req, file, cb) {
//        var datetimestamp = Date.now();
//        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
//     },
//     metadata: function(req, file, cb) {
//       cb(null, { originalname: file.originalname });
//     },
//     root: 'photos' //root name for collection to store files into
// });
//
// var upload = multer({
//   storage: storage
// }).array('photo');
//
// router.use('/', upload);

router.use('/', fileUpload());

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
  var furnished = false;
  if (req.body.furnished === 1) {
    furnished = true;
  }
  var description = req.body.description;
  var files = req.files;
  var state = req.body.state;
  var city = req.body.city;
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
      city: city,
      state: state,
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
    if (Array.isArray(files.photo)) {
      for(var i = 0; i < files.photo.length; i++) {
        var curr = files.photo[i]
        photos.push({
          data: curr.data,
          contentType: curr.mimetype
        });
      }
    } else {
      photos.push({
        data: files.photo.data,
        contentType: files.photo.mimetype
      });
    }
    listingData.photos = photos;
  }

  listingDb.addListing(listingData, function (err, listing) {
    if(err) {
      next(err);
    } else {
      var id = listing.id.valueOf();
      res.redirect('/create/success/' + id);
    }
  });
});

router.get('/success/:id', function(req, res, next) {
  res.render('success', {id : req.params.id});
});

module.exports = router;
