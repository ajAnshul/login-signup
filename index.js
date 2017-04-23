var express = require('express');
var app = require('express')();
var bodyParser = require("body-parser");
var auth = require("./auth.js")();
var users = require("./users.js");
var cfg = require("./config.js");
var jwt = require("jwt-simple");
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var social = require('./social.js');
var cors = require('cors');

app.use(express.static(__dirname+'/common-ui'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(auth.initialize());

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

// facebookAuth Strategy
passport.use(new FacebookStrategy({
      clientID        : social.facebookAuth.clientId,
      clientSecret    : social.facebookAuth.clientSecret,
      callbackURL     : "http://localhost:8085/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log("got inside");
    console.log(profile);
    var user = users.find(function(u){
      return u.name == profile.displayName;
    });

    if(user){
      done(null,user);
    } else{
      var obj = {};
      obj.id = users.length+1;
      obj.email = ''
      obj.password = accessToken;
      users.push(obj);
      done(null,obj);
    }
  }));
// sign up routes
app.post("/signup",function(req,res){
  var obj = {};
  obj.id = users.length+1;
  obj.email = req.body.email;
  obj.password = req.body.password;
  users.push(obj);
  console.log(users);
  res.json({msg:"succefull"})
})


// login route
app.post("/login", function(req, res) {
  console.log("login got call");
  console.log(req.body.email+" "+req.body.password);
  console.log("-------------------------------");
  console.log(req.body);
  console.log(users);
    if (req.body.email && req.body.password) {
        var email = req.body.email;
        var password = req.body.password;
        var user = users.find(function(u) {
            return u.email === email && u.password === password;
        });
        console.log(user);
        if (user) {
            var payload = {
                id: user.id
            };
            var token = jwt.encode(payload, cfg.jwtSecret);
            res.json({
                id:payload.id,
                token: 'JWT '+token
            });
        } else {
            res.sendStatus(401);
        }
    } else {
        res.sendStatus(401);
    }
});

// api for facebook auth
app.get('/auth/facebook', passport.authenticate('facebook',{scope:'email'}));
app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    console.log("got response from facebook----------------------------------");
    res.redirect('/user');
  });
// Test api
app.get("/api",function(req,res){
  res.json({
    status:"This is api is alive"
  })
})
app.get("/user", auth.authenticate(), function(req, res) {
  console.log("----------------------------------------");
    res.json({msg:"Welcome to JWT"});
});


//server
app.listen(8085,function(){
  console.log("running 8085");
})
module.exports = app;
