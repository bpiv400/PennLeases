var mongo = require('./mongo');

module.exports = {
  getPhotoById: function(idString, callback) {
    mongo.Photo.findById(idString, function (err, photo) {
      photo = photo.toObject();
      callback(err, photo)
    });
  }
};
