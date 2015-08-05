var express = require('express');
var router = express.Router();
var jwt = require('jwt-simple');
var bodyParser = require('body-parser');
var UserModel = require('../models/users');
var crypto = require('crypto');

// Fichero de propiedades
var PropertiesReader = require('properties-reader');
var properties = PropertiesReader('./sso.properties');

// Definición del log
var fs = require('fs');
var log = require('tracer').console({
    transport : function(data) {
        //console.log(data.output);
        fs.open(properties.get('main.log.file'), 'a', 0666, function(e, id) {
            fs.write(id, data.output+"\n", null, 'utf8', function() {
                fs.close(id, function() {
                });
            });
        });
    }
});

/**
 * @api {post} /validate/ Validate token
 * @apiName PostValidate
 * @apiGroup Validate
 *
 * @apiDescription Validate SUMO token
 * @apiSampleRequest https://sumo.kyroslbs.com/validate
 * @apiParam {String} token Token
 * @apiSuccess {String} message message with result information
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *         "user": "my_username"
 *         "role": "my_role"
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
               //"status": 401,
               "message": "Invalid token"
             });
             return;
          }

          var decoded = jwt.decode(token, require('../config/secret.js')());

          // Comprobar la expiracion del token
          log.debug('Comprobar la expiracion del token');
          if (decoded.exp <= Date.now()) {
            log.debug('Token Expired');

            res.status(401);
            res.json({
              //"status": 401,
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
                //"status": 401,
                "message": "Invalid user"
              });
              return;
            }

            else {
              log.debug('User valido');

              res.status(200);
              res.json({
                //"status": 200,
                //"message": "Token OK",
                user: decoded.iss,
                role: decoded.role

              });
              return;
            }

        });

      } catch (err) {
        res.status(400);
        res.json({
          //"status": 500,
          //"message": "Oops something went wrong",
          //"status": 400,
          "message": "Invalid Token"
        });
     }

    }
    else
    {
      res.status(400);
      res.json({
        //"status": 400,
        "message": "Invalid Token"
      });
      return;
    }
  });

module.exports = router;
