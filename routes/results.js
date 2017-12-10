var express = require('express');
var router = express.Router();
var listingDb = require('../data/listings');


/* GET home page. */
router.get('/', function(req, res, next) {
  var constraints = {
    page : parseInt(req.query.pg),
    limit : parseInt(req.query.lim),
    maxPrice : parseInt(req.query.max),
    minPrice : parseInt(req.query.min),
    occupancy : parseInt(req.query.occ),
    term : req.query.term,
    furnished : req.query.furn
  };
  var types = [];
  const apartments = (req.query.apt == 'true');
  const houses = (req.query.house == 'true');
  if (apartments) {
    types.push('Apartment Building');
  }
  if (houses) {
    types.push('House');
  }
  constraints.types = types;
  var sort ={};
  sort[req.query.srt] = parseInt(req.query.ord);
  constraints.sort = sort;
  console.log(constraints.sort);
  listingDb.getSearchResults(constraints,
    function(error, listings, addresses) {
      if (error) {
        next(error);
      } else {
        res.json({
          listings: listings,
          addresses: addresses
        });
      }
    }
  );
});

module.exports = router;
