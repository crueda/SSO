var express = require('express');
var router = express.Router();

router.post('/*', function(req, res)
{
  console.log("en post de sso: " + req.originalUrl);

  res.redirect(307, "http://localhost:3001"+ req.originalUrl);
});


module.exports = router;
