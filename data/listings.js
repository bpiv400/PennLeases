var mongo = require('./mongo');

module.exports = {
  addListing: function (listingData, callback) {
    var address = new mongo.Address(listingData.address);
    address.save(function(err, newAddress) {
      if (err) {
        callback(err, null);
      }
    });
    if (listingData.photos) {
      var photoArray = new Array();
      for (var i = 0; i < listingData.photos.length; i++) {
        var currPhoto = new mongo.Photo(listingData.photos[i]);
        currPhoto.save(function (err, newPhoto) {
          if (err) {
            callback(err, null);
          }
        });
        photoArray.push(currPhoto);
      }
      listingData.photos = photoArray;
    }
    listingData.address = address;
    var listing = new mongo.Listings(listingData);
    listing.save(function (err, newListing) {
      callback(err, newListing);
    });
  },
  getListingById: function(idString, callback) {
    mongo.Listings.findById(idString).populate('address')
    .exec(function (error, listing) {
      if (error) {
        callback(error, listing, null);
      } else {
        photos = listing.photos;
        //console.log(photos);
        //console.log(typeof photos[0]);
        address = listing.address;
        listing = listing.toObject();
        address = address.toObject();
        callback(error, listing, address);
      }
    });
  }
};
