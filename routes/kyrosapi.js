var express = require('express');
var router = express.Router();

router.post('/*', function(req, res)
{
  //res.redirect(307, "https://localhost:3001"+ req.originalUrl);
  res.redirect(307, "http://localhost:3001"+ req.originalUrl);
});


module.exports = router;
