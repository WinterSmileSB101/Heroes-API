var express = require('express');
var router = express.Router();
var hero = require('../lib/hero');
var heroesFire = require('../lib/heroesfire');


router.get('/get', hero.get);


router.get('/getall', hero.getAll);

router.get('/ids', heroesFire.heroId);

//router.get('/guides', heroesFire.guides);
router.get('/guides', heroesFire.guidesEachHero);
//router.get('/sing-guide', heroesFire.singleGuide);





module.exports = router;

//app.get('/wines/:id', wine.findById);
//app.post('/wines', wine.addWine);
//app.put('/wines/:id', wine.updateWine);

