var express = require('express');
var router = express.Router();
var jwt = require('jwt-simple');
var bodyParser = require('body-parser');
var UserModel = require('../models/users');
var crypto = require('crypto');

var Log = require('log');
var fs = require('fs');
var log = new Log('debug', fs.createWriteStream('/var/log/sso.log'));

/**
 * @api {post} /login/ Login to Single-SignOn platform
 * @apiName PostLogin
 * @apiGroup Login
 *
 * @apiDescription Login to SUMO SSO
 * @apiSampleRequest http://sumo.kyroslbs.com:3000/login
 * @apiParam {String} username Username
 * @apiParam {String} password Password (SHA256)
 * @apiSuccess {String} message message with token information
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE0MzIyMjE4Njk1NTcsImlzcyI6InN1bW8iLCJyb2xlIjoiYWRtaW5pc3RyYXRvciJ9.3lHHWqKgeeEdX7XyvRV2BHA9YXJJ4u9UaeI5eXpTxGY",
 *         "expires": 1432221869557,
 *         "user": "my_username",
 *         "role": "my_role"
 *     }
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Not authorized
 *     {
 *       "message": "Invalid user"
 *     }
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Not authorized
 *     {
 *       "message": "Invalid credentials"
 *     }
 */
  router.post("/login", function(req,res)
  {
    var username = req.query.username || '';
    var password = req.query.password || '';

    log.info('Peticion de login. username:'+username + ' - password:'+password);

    try {


    if (username == '' || password == '') {
       log.debug('Invalid credentials');
       res.status(401);
       res.setHeader('Content-Type', 'text/plain');
       res.json({
         //"status": 401,
         "message": "Invalid credentials"
       });
       return;
    }

   // Authorize the user to see if s/he can access our resources
   var userData = {username:req.query.username};

   //var dbUserObj =
   var passwordDB = '';
   var roleDB = '';
   UserModel.getUser(userData,function(error, dbUser) {
       if (dbUser==null) {
         res.status(500);
         res.json({
           //"status": 500,
           "message": "Oops something went wrong :(",
         });
         return;
       }

       if (typeof dbUser == 'undefined' || dbUser.length == 0) {
         log.debug('Invalid user');
         res.status(401);
         res.setHeader('Content-Type', 'text/plain');
         res.json({
           "status": 401,
           "message": "Invalid user"
         });
         return;
       }
       else {
         passwordDB = dbUser[0].password;
         roleDB = dbUser[0].role;

         var passwordDBsha256 = crypto.createHash('sha256').update(passwordDB).digest("hex");
         //log.debug('Password:'+passwordDBsha256);

         if (password!=passwordDBsha256) {
           log.debug('Invalid credentials');
           res.status(401);
           res.setHeader('Content-Type', 'text/plain');
           res.json({
             //"status": 401,
             "message": "Invalid credentials"
           });
           //return;
         }
         else {
           log.debug('Generando token');
           res.json(genToken(username, roleDB));
         }
     }

   });

 } catch (err) {
   res.status(500);
   res.json({
     //"status": 500,
     "message": "mmmm ... something went wrong",
     //"error": err
   });
 }
});

// private method
function genToken(username, role) {
  var expires = expiresIn(7); // 7 days
  var token = jwt.encode({
    exp: expires,
    iss: username,
    role: role
  }, require('../config/secret')());

  return {
    token: token,
    expires: expires,
    user: username,
    role: role
  };
}

function expiresIn(numDays) {
  var dateObj = new Date();
  return dateObj.setDate(dateObj.getDate() + numDays);
}

module.exports = router;
