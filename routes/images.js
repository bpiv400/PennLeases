var express = require('express');
var router = express.Router();
var imageDb = require('../data/images');

router.get('/', function(req, res, next) {
  var photoId = req.query.id;
  if (!photoId) {
    res.send('What are you doing here?');
  } else {
    imageDb.getPhotoById(photoId, function(err, photo) {
      if (err) {
        next(err);
      }
      res.contentType(photo.contentType);
      res.end(photo.data.buffer, 'binary');
    });
  }
});

module.exports = router;
