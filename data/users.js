var mongo = require('./mongo');

module.exports = {
  findOrCreate(userData, callback) {
    mongo.User.findOne({'facebook.id' : userData.id}, function(err, user) {
      if (err) {
        return callback(err);
      } else if (!user) {
        console.log(userData);
        user = new mongo.User({
          name: userData.displayName,
          email: userData.email,
          provider: 'facebook',
          profile: userData._json,
          following: [],
          posted: []
        });
        user.save(function(err) {
          if (err) {
            console.log(err);
          } else {
            console.log('user saved correctly');
          }
          return callback(err, user);
        });
      } else {
        return callback(err, user);
      }
    });
  }
}
