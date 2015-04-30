var jwt = require('jwt-simple');
var UserModel = require('../models/users');

var Log = require('log');
var fs = require('fs');
var log = new Log('debug', fs.createWriteStream('/var/log/sso.log'));
//var log = new Log('debug', fs.createWriteStream('/Users/Carlos/Workspace/SUMO/SSO/sso.log'));

module.exports = function(req, res, next) {

  var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
  var key = (req.body && req.body.x_key) || (req.query && req.query.x_key) || req.headers['x-key'];

  if (token || key) {
    try {
      var decoded = jwt.decode(token, require('../config/secret.js')());

      // Comprobar la expiracion del token
      if (decoded.exp <= Date.now()) {
        log.info('Token Expired para:'+key);

        res.status(400);
        res.json({
          "status": 400,
          "message": "Token Expired"
        });
        return;
      }

      // Comprobar la existencia del usuario
      var userData = {username:key};
      UserModel.getUser(userData,function(error, dbUser) {
          if (dbUser==null) {
            res.status(500);
            res.json({
              "status": 500,
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
            next();
          }

      });

    } catch (err) {
    res.status(500);
    res.json({
      //"status": 500,
      //"message": "Oops something went wrong",
      "status": 401,
      "message": "Invalid Token or Key",
      "error": err
    });
   }
  } else {
    res.status(401);
    res.json({
      "status": 401,
      "message": "Invalid Token or Key"
    });
    return;
  }
}
