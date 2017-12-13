var crypto = require('crypto');
var mongoose = require('mongoose'),
    User = mongoose.model('User');

function hashPW(pwd){
  return crypto.createHash('sha256').update(pwd).
         digest('base64').toString();
}

exports.signup = function(req, res){
  console.log("Begin exports.signup");
  var user = new User({username:req.body.username});
  console.log("after new user exports.signup");
  user.set('hashed_password', hashPW(req.body.password));
  console.log("after hashing user exports.signup");
  user.set('email', req.body.email);
  console.log("after email user exports.signup");

  user.save(function(err) {
    console.log("In exports.signup");
    console.log(err);

    if (err){
      res.session.error = err;
      res.redirect('/signup');
    } else {
      req.session.user = user.id;
      req.session.username = user.username;
      req.session.msg = 'Authenticated as ' + user.username;
      res.redirect('/');
    }
  });
};

exports.login = function(req, res){
  User.findOne({ username: req.body.username })

  .exec(function(err, user) {

    if (!user){
      err = 'User Not Found.';
    }
    else if (user.hashed_password === hashPW(req.body.password.toString())) {

      req.session.regenerate(function(){
        console.log("login");
        console.log(user);
        req.session.user = user.id;
        req.session.username = user.username;
        req.session.msg = 'Authenticated as ' + user.username;
        req.session.charactername = user.charactername;
        req.session.class = user.class,
        req.session.race = user.race,
        req.session.background = user.background,
        req.session.img = user.img,
        req.session.str = user.str,
        req.session.agi = user.agi,
        req.session.con = user.con,
        req.session.int = user.int,
        req.session.wis = user.wis,
        req.session.cha = user.cha,
        req.session.backstory = user.backstory
        res.redirect('/');
      });
    }
    else{
      err = 'Authentication failed.';
    }

    if(err){
      req.session.regenerate(function(){
        req.session.msg = err;
        res.redirect('/login');
      });
    }
  });
};

exports.getUserProfile = function(req, res) {
  User.findOne({ _id: req.session.user })
  .exec(function(err, user) {
    if (!user){
      res.json(404, {err: 'User Not Found.'});
    } else {
      res.json(user);
    }
  });
};

exports.updateUser = function(req, res){
  User.findOne({ _id: req.session.user })

  .exec(function(err, user) {
    user.set('email', req.body.email);
    user.set('character', req.body.character);
    user.save(function(err) {

      if (err){
        res.sessor.error = err;
      }
      else {
        req.session.msg = 'User Updated.';
        req.session.character = req.body.character;
      }
      res.redirect('/user');
    });
  });
};

exports.deleteUser = function(req, res){
  User.findOne({ _id: req.session.user })

  .exec(function(err, user) {

    if(user){
      user.remove(function(err){

        if (err){
          req.session.msg = err;
        }
        req.session.destroy(function(){
          res.redirect('/login');
        });
      });
    }
    else{
      req.session.msg = "User Not Found!";

	req.session.destroy(function(){
        res.redirect('/login');
      });
    }
  });
};
