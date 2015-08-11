var express = require('express');
var router = express.Router();
var http = require('http');

router.post('/*', function(req, res)
{
  //res.redirect(307, "http://localhost:3001"+ req.originalUrl);



  var options = {
    hostname: 'localhost',
    port: 3001,
    path: req.originalUrl,
    method: 'POST'
  };



  var req2 = http.request({
      host: 'localhost',
      // proxy IP
      port: 3001,
      // proxy port
      method: 'POST',
      path: 'http://localhost:3001/kyrosapi/Status' // full URL as path
  }, function (res) {
      res.on('data', function (data) {
          console.log(data.toString());
      });
  });

  req2.end();

  req.pipe(req2, {end: true});





});


module.exports = router;
