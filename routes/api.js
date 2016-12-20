var express = require('express');
var router = express.Router();
var hero = require('../lib/engine/hero');
var heroesFire = require('../lib/engine/heroesfire');


//format: [/api/get?name=li-li]
router.get('/get', hero.getByName);
router.get('/getall', hero.getAll);
router.get('/ids', heroesFire.heroId);
//format: [/api/guides?name=li-li]
router.get('/guides', heroesFire.guidesEachHero);


module.exports = router;



