var express = require('express');
var router = express.Router();
var hero = require('../lib/engine/hero');
var heroesFire = require('../lib/engine/heroesfire');


//format: [/api/get?name=li-li]
router.get('/hero/get', hero.getByName);
router.get('/hero/get/all', hero.getAll);
router.get('/ids', heroesFire.heroId);
//format: [/api/guide/all/li-li]
router.get('/guide/all/:name([a-zA-Z\-]+)', heroesFire.getAllGuideByName);
//format: [/api/guide/get/hots/guide/chubbsz-li-li-guide-leoric-release-1296]
router.get('/guide/get', heroesFire.getGuideDetail);

module.exports = router;



