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
 * @api {post} /validate/ Validate token
 * @apiName PostValidate
 * @apiGroup Validate
 *
 * @apiDescription Validate SUMO token
 * @apiSampleRequest http://sumo.kyroslbs.com:3000/validate
 * @apiParam {String} token Token
 * @apiSuccess {String} message message with result information
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "message": "Token OK"
 *     }
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 400 Bad request
 *     {
 *       "message": "Invalid token"
 *     }
 * @apiErrorExample {json} Error-Response:
 *     HTTP/1.1 401 Not authorized
 *     {
 *       "message": "Token Expired"
 *     }
 */

  router.post("/validate", function(req,res)
  {
    var token = req.query.token || '';

    //var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
    log.info('Peticion de validacion del token:'+token);

    if (token) {
        try {
          if (token == '') {
             log.debug('Invalid token');
             res.status(401);
             res.setHeader('Content-Type', 'text/plain');
             res.json({
               "status": 400,
               "message": "Invalid token"
             });
             return;
          }

          var decoded = jwt.decode(token, require('../config/secret.js')());

          // Comprobar la expiracion del token
          log.debug('Comprobar la expiracion del token');
          if (decoded.exp <= Date.now()) {
            log.debug('Token Expired');

            res.status(400);
            res.json({
              "status": 401,
              "message": "Token Expired"
            });
            return;
          }

          // Comprobar la existencia del usuario
          var userData = {username:decoded.iss};
          log.debug('Comprobar el usuario: '+decoded.iss);

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
              res.status(400);
              res.setHeader('Content-Type', 'text/plain');
              res.json({
                "status": 401,
                "message": "Invalid user"
              });
              return;
            }

            else {
              log.debug('User valido');

              res.status(200);
              res.json({
                "status": 200,
                "message": "Token OK",
              });
              return;
            }

        });

      } catch (err) {
        res.status(400);
        res.json({
          //"status": 500,
          //"message": "Oops something went wrong",
          "status": 400,
          "message": "Invalid Token"
        });
     }

    }
    else
    {
      res.status(400);
      res.json({
        "status": 400,
        "message": "Invalid Token"
      });
      return;
    }
  });

module.exports = router;
