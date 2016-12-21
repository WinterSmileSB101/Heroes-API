var express = require('express');
var router = express.Router();
var hero = require('../lib/engine/hero');
var heroesFire = require('../lib/engine/heroesfire');


router.get('/get', hero.getByName);
router.get('/getall', hero.getAll);
router.get('/ids', heroesFire.heroId);
//router.get('/guides', heroesFire.guides);
//router.get('/guides', heroesFire.getGuidesByName);
//router.get('/sing-guide', heroesFire.singleGuide);
router.get('/id/update', heroesFire.updateHeroIdCol);
router.get('/guide/update', heroesFire.updateHeroGuides);


module.exports = router;


