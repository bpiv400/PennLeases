var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var options = {
  useMongoClient: true,
};

var uri = 'mongodb://eplu:uvTna5WdB4JKStfn@pennleases01-'  +
'shard-00-00-46rxg.mongodb.net:27017,' +
'pennleases01-shard-00-01-46rxg.' +
'mongodb.net:27017,pennleases01-shard-00' +
'-02-46rxg.mongodb.net:27017/penn-leases?ssl=true&' +
'replicaSet=PennLeases01-shard-0&authSource=admin';

mongoose.connect(uri, options,
  function (err) {
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

var userSchema = new mongoose.Schema({
  name: {type: String, required : true},
  email: {type: String, required : true},
  provider: {type: String, required : true},
  profile: {type: Object, required: true},
  following: {type:[{type: mongoose.Schema.Types.ObjectId, ref: 'Listing'}],
    required : true, default : []},
  posted: {type:[{type: mongoose.Schema.Types.ObjectId, ref: 'Listing'}],
    required : true, default : []},
});

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
  name: {type: String, required: true, trim: true},
  email: {type: String, required: true, trim: true},
  price: {type: Number, required: true, min: 0},
  furnished: {type: Boolean, required: true},
  size: {type: Number, min: 0},
  date: {type: Date, default : Date.now},
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
      return ((value % 1 === 0 || value % 1 === .5) && value >= 0);
    },
    message: 'Value must be multiple of 1/2'
  }, required: true},
  description: {type: String, maxlength: 400},
  address: {type: mongoose.Schema.Types.ObjectId, ref : 'Address', required : true},
  photos: [{type: mongoose.Schema.Types.ObjectId, ref : 'Photo'}]
});
var photoSchema = new mongoose.Schema({
  data : {type: Buffer, required: true},
  contentType: {type: String, required: true}
});

var addressSchema = new mongoose.Schema({
  streetNumber : {type : Number, required: true, validate: {
    validator: function (value) {
      return (value % 1) === 0;
    },
    message : 'street number must be valid integer'
  }},
  street: {type: String, required: true, trim: true},
  unit: {type: String, trim: true},
  city: {type: String, required: true, trim: true},
  state: {type: String, required: true},
  zip: {type: String, required: true, minlength: 5, trim: true}
});

var Listings = mongoose.model('Listing', listingSchema);
var Address = mongoose.model('Address', addressSchema);
var Photo = mongoose.model('Photo', photoSchema);
var User = mongoose.model('User', userSchema);
module.exports = {
  Listings: Listings,
  User: User,
  Photo: Photo,
  Address: Address,
  mongoose: mongoose,
  conn: db,
  listingDb: db.collection('Listings'),
  possTerms: possTerms
};
