var express = require('express');
var router = express.Router();

/* GET home page. */

/*--------------------------------------------*/
router.get('/',function(req,res){
res.send("Welcome to Track Your Tag Node.js Server");
});


router.get('/:id/:password',function(req,res){
  if(req.params.id=="ad@min" && req.params.password=="admin")
  res.send("valid");
  else
  res.send("invalid");
});

/*--------------------------------------------*/


module.exports = router;
