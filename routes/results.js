var express = require('express');
var router = express.Router();
var listingDb = require('../data/listings');


/* GET home page. */
router.get('/', function(req, res, next) {
  var constraints = {
    page : parseInt(req.query.pg),
    limit : parseInt(req.query.lim)
  };
  constraints.restrictions = {};
  var sort ={};
  sort[req.query.srt] = parseInt(req.query.ord);
  constraints.sort = sort;
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
