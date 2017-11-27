var express = require('express');
var router = express.Router();
var listingDb = require('../data/listings');

router.get('/:id', function (req, res, next) {
  listingDb.getListingById(req.params.id, function (err, listing, address) {
    if (err) {
      next(err);
    } else {
      if (!listing.photos) {
          photos = listing.photos.map(function(photo) {
            return photo.toString()
        });
          delete listing.photos;
      }
      delete listing.address;
      delete listing.__v;
      res.render('view', {
        listing: listing,
        address: address,
        photos: photos
      });
    }
  });
});

module.exports = router;
