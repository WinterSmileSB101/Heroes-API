var express = require('express');
var router = express.Router();
var hero = require('../lib/hero');
var heroesFire = require('../lib/heroesfire');


//format: [/api/get?name=li-li]
router.get('/get', hero.get);
router.get('/getall', hero.getAll);
router.get('/ids', heroesFire.heroId);
//format: [/api/guides?name=li-li]
router.get('/guides', heroesFire.guidesEachHero);



module.exports = router;



