
// TODO: Write the handleError middleware.
// This function must be an express error handling middleware

var loginCheck = function (req, res, next) {
  console.log(req.user);
  if (!req.user) {
    console.log(req.path);
    if (req.path !== '/login' &&
      req.path !== '/auth/facebook' &&
      req.path !== '/auth/facebook/' &&
      req.path !== 'auth/facebook/callback' &&
      req.path !== 'auth/facebook/callback/') {
      res.redirect('/login');
    }
  }
  next();
};

// Export the middleware function for use in app.js
module.exports = loginCheck;
