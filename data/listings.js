var mongo = require('./mongo');

module.exports = {
  addListing: function (listingData, callback) {
    var address = new mongo.Address(listingData.address);
    address.save(function (err, newAddress) {
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
  getListingById: function (idString, callback) {
    mongo.Listings.findById(idString).populate('address')
      .exec(function (error, listing) {
        if (error) {
          callback(error, listing, null);
        } else {
          var photos = listing.photos;
          //console.log(photos);
          //console.log(typeof photos[0]);
          var address = listing.address;
          listing = listing.toObject();
          address = address.toObject();
          callback(error, listing, address, photos);
        }
      });
  },
  getSearchResults: function (constraints, callback) {
    console.log(constraints.limit);
    if (constraints.occupancy === 0 || !constraints.occupancy) {
      constraints.occupancy = {
        $gte : 0
      };
    } else {
      constraints.occupancy = {
        $eq : constraints.occupancy
      };
    }
    if (!constraints.minPrice) {
      constraints.minPrice = 0;
    }
    if (!constraints.furnished) {
      constraints.furnished = {
        $in : [true, false]
      };
    } else {
      constraints.furnished = {
        $in : constraints.furnished
      };
    }
    if (!constraints.term) {
      constraints.term = {
        $in : mongo.possTerms
      };
    } else {
      constraints.term = {
        $all : constraints.term
      };
    }
    if (!constraints.maxPrice) {
      constraints.maxPrice = 10000;
    }
    if (!constraints.types || constraints.types.length === 0) {
      constraints.types = ['Apartment Building', 'House'];
    }
    mongo.Listings.find(
      { $and: [
        {price : { $gte: constraints.minPrice, $lte: constraints.maxPrice } },
        {housingType : { $in: constraints.types} },
        {occupancy : constraints.occupancy },
        {term: constraints.term},
        {furnished: constraints.furnished}
      ]
      }).
      limit(constraints.limit).
      skip(constraints.limit * (constraints.page - 1)).
      sort(constraints.sort).
      populate('address').
      exec(function (error, listings) {
        if (error) {
          callback(error, listings, null);
        } else {
          var addresses = Array();
          listings = listings.map(function (listing) {
            var out = listing.toObject();
            delete out.address.__v;
            delete out.address._id;
            addresses.push(out.address);
            delete out.address;
            delete out.__v;
            return out;
          });
          callback(error, listings, addresses);
        }
      });
  }
};
