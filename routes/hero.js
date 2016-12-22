var express = require('express');
var router = express.Router();
var hero = require('../lib/engine/hero');
var heroesFire = require('../lib/engine/heroesfire');

router.get('/ids', heroesFire.heroId);
router.get('/id/update', heroesFire.updateHeroIdCol);
router.get('/guide/update', heroesFire.updateHeroGuidesById);
router.get('/guide/update/all', heroesFire.updateAllHeroGuides);

module.exports = router;


