var passport = require('passport');
var LinkedInStrategy = require('passport-linkedin');

var User = require('../models/user');
var config = require('../_config');
var init = require('./init');

passport.use(new LinkedInStrategy({
   consumerKey: config.linkedin.clientID,
   consumerSecret: config.linkedin.clientSecret,
   callbackURL: config.linkedin.callbackURL,
   scope:        [ 'r_basicprofile', 'r_emailaddress'],
   profileFields: ['id', 'first-name', 'last-name', 'email-address', 'headline','summary']
 },
 
 
  function(token, tokenSecret, profile, done) {
	  
	console.log(profile);

    var searchQuery = {
      name: profile.displayName
    };

    var updates = {
      name: profile.displayName,
      someID: profile.id,
	  summary: profile._json.summary };

    var options = {
      upsert: true
    };

    // update the user if s/he exists or add a new user
    User.findOneAndUpdate(searchQuery, updates, options, function(err, user) {
      if(err) {
        return done(err);
      } else {
        return done(null, user);
      }
    });
  }

));

// serialize user into the session
init();


module.exports = passport;
