var express = require('express');
var router = express.Router();
var passportLinkedIn = require('../auth/linkedin');
var passportGithub = require('../auth/github');
var passportTwitter = require('../auth/twitter');
var torre = require('../auth/torre');


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Profile Merge' });
});

router.get('/login', function(req, res, next) {
  res.send('Go back and register!');
});

router.get('/home', function(req, res){
  res.render('home', { user: req.user });
});

router.get('/auth/linkedin', passportLinkedIn.authenticate('linkedin',{ scope: ['r_basicprofile'] }));

router.get('/auth/linkedin/callback',
  passportLinkedIn.authenticate('linkedin',
  { 
	successRedirect: '/home',
	failureRedirect: '/login' }
	),
  function(req, res) {
    // Successful authentication
    res.json(req.user);
  });

router.get('/auth/github', passportGithub.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/auth/github/callback',
  passportGithub.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication
    res.json(req.user);
  });

router.get('/auth/twitter', passportTwitter.authenticate('twitter'));

router.get('/auth/twitter/callback',
  passportTwitter.authenticate('twitter', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication
    res.json(req.user);
  });

  
router.post('/getId', function(req, res) {
	var username = req.body.username;
	torre.getProfile(username, function(err, data){ 
      if(err){
		res.send(err);
	  } else {
		  
        res.render('profile', {username: username, user: req.user, torre_profile: data});
	  }
    });
});


router.post('/test', function(req, res){
  res.render('test', { user: req.user });
});


module.exports = router;