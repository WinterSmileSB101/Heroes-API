var express = require('express');
var router = express.Router();
var hero = require('../lib/hero');




router.get('/get', hero.get);


router.get('/getall', hero.getAll);

module.exports = router;

//app.get('/wines/:id', wine.findById);
//app.post('/wines', wine.addWine);
//app.put('/wines/:id', wine.updateWine);

