var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/penn-leases', function (err) {
  if (err && err.message.includes('ECONNREFUSED')) {
    console.log('Error connecting to mongodb database: %s.\nIs "mongod" running?', err.message);
    process.exit(0);
  } else if (err) {
    throw err;
  } else {
    console.log('DB successfully connected');
  }
});

var db = mongoose.connection;
var possTerms = ['Spring 2018', 'Summer 2018', 'Fall 2018'];

var listingSchema = new mongoose.Schema({
  housingType: {type : String, required : true, enum: ['House', 'Apartment Building']},
  term: {type: [{type: String, enum: possTerms}], required : true,
  /*validate: {
    validator : function (value) {
      var terms = possTerms;
      for (var i = 0; i < value.length; i++) {
        var isEqual = false;
        for (var j = 0; j < terms.length; j++) {
          if (value[i] === terms[j])
            isEqual = true;
        }
        if (!isEqual) {
          return false;
        }
      }
      return true;
    },
    message: 'Term must be one of the legal options'
  }*/
  },
  buildingName : {type: String},
  price: {type: Number, required: true, min: 0},
  furnished: {type: Boolean, required: true},
  size: {type: Number, min: 0},
  occupancy: {type: Number, validate: {
      validator : function (value) {
        return value % 1 === 0 && value > 0;
      },
      message: 'Occupancy must be positive integer'
  }, required: true},
  beds: {type: Number, validate: {
      validator : function (value) {
        return value % 1 === 0 && value > 0;
      },
      message: 'Beds must be positive integer'
  }, required: true},
  baths: {type: Number, validate: {
        validator: function (value) {
            return  ((value % 1 === 0 || value % 1 === .5) && value >= 0);
        },
        message: 'Value must be multiple of 1/2'
      }, required: true},
  description: {type: String, maxlength: 400},
  address: {type: mongoose.Schema.Types.ObjectId, ref : 'Address', required : true}

});

var addressSchema = new mongoose.Schema({
  streetNumber : {type : String, required: true, trim: true, validate: {
    validator: function (value) {
      try {
        Integer.parseInt(value);
        return true;
      } catch (err) {
        return false;
      }
    }, message : 'street number must be valid integer'
  }},
  street: {type: String, required: true, trim: true},
  unit: {type: String},
  zip: {type: String, required: true, minlength: 5, maxlength: 5, validate: {
    validator: function (value) {
      try {
        Integer.parseInt(value);
        return true;
      } catch (err) {
        return false;
      }
    }, message : 'street number must be valid integer'
  }},
});

var Listings = mongoose.model('Listing', listingSchema);
var Address = mongoose.model('Address', addressSchema);

module.exports = {
  Listings: Listings,
  Address: Address,
  mongoose: mongoose,
  db: db.collection('Listings'),
  possTerms: possTerms
};