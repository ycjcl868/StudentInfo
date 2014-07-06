// Generated by CoffeeScript 1.7.1
(function() {
  var express, mongoose, router, user;

  express = require("express");

  mongoose = require('mongoose');

  router = express.Router();

  user = mongoose.model('User');

  router.post('/Login', function(req, res) {
    var password, username;
    username = req.body.username;
    password = req.body.password;
    return user.find({
      username: username,
      password: password
    }, function(err, data) {
      if (data.length === 0) {
        return res.render('login', {
          status: '<div class="option_result">用户名或密码错误</div>'
        });
      } else {
        req.session.username = username;
        return res.redirect("/");
      }
    });
  });

  router.get('/login', function(req, res) {
    return res.redirect('/');
  });

  router.use('/logout', function(req, res) {
    req.session.username = null;
    return res.redirect('/');
  });

  router.get('/changepasswd', function(req, res) {
    if (req.session.username == null) {
      return res.redirect('/');
    } else {
      return res.render('changePasswd', {
        username: req.session.username,
        status: ''
      });
    }
  });

  router.post('/Changepasswd', function(req, res) {
    var oldPassword, password, username;
    if (req.session.username == null) {
      return res.redirect('/');
    } else {
      username = req.session.username;
      oldPassword = req.body.oldPassword;
      password = req.body.password;
      console.log(username, oldPassword, password);
      return user.findOne({
        username: username,
        password: oldPassword
      }, function(err, data) {
        var passwordRegex;
        if (data == null) {
          return res.render('changePasswd', {
            username: username,
            status: '<div class="alert alert-danger">您输入的密码有错误</div>'
          });
        } else {
          passwordRegex = new RegExp(/\w{6,16}/);
          if (!passwordRegex.test(password)) {
            res.render('changePasswd', {
              username: username,
              status: '<div class="alert alert-danger">密码不规范，应为6~16位字母和数字！</div>'
            });
          } else {
            data.password = password;
          }
          data.save();
          return res.render('changePasswd', {
            username: username,
            status: '<div class="alert alert-success">密码修改成功！</div>'
          });
        }
      });
    }
  });

  module.exports = router;

}).call(this);

//# sourceMappingURL=user.map
