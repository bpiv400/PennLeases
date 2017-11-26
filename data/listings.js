var mongo = require('./mongo');

module.exports = {
  addListing: function (listingData, callback) {
    var address = new mongo.Address(listingData.address);
    listingData.address = address;
    var listing = new mongo.Listings(listingData);
    listing.save(function (err) {
      callback(err);
    });
  }
};
