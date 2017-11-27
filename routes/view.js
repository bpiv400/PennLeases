var express = require('express');
var router = express.Router();
var listingDb = require('../data/listings');

router.get('/:id', function (req, res, next) {
  listingDb.getListingById(req.params.id, function (err, listing, address,
    photos) {
    if (err) {
      next(err);
    } else {
      delete listing.photos;
      delete listing.address;
      delete listing.__v;
      address.state = 'MD';
      address.lineOne = address.streetNumber + ' ' +
      address.street;
      address.lineTwo = address.unit;
      address.lineThree = address.city + ', ' + address.state;
      var spaceReg = new RegExp('\\s+', 'g');
      var commaSpaceReg = new RegExp(',\\s', 'g');
      address.url = (address.lineOne + ',');
      address.url = (address.url + address.lineThree.
        replace(commaSpaceReg, ',') + '+' +
        address.zip).replace(spaceReg, '+');
      console.log(address.url);
      res.render('view', {
        listing: listing,
        address: address,
        photos: photos,
        key: 'AIzaSyCHwd6sYoUBCeyBss6coqJTC2J_H7xTM3E'
      });
    }
  });
});

module.exports = router;
