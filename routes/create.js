var express = require('express');
var termOptions = require('../data/mongo').possTerms;
var router = express.Router();
var listingDb = require('../data/listings');


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
  listingDb.addListing(listingData, function(err) {
    if(err) {
      next(err);
    } else {
      res.send('Listing added successfully!');
    }
  });
});

module.exports = router;
