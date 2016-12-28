var express = require('express');
var router = express.Router();
var hero = require('../lib/engine/hero');
var heroesFire = require('../lib/engine/heroesfire');

router.get('/ids', heroesFire.heroId);
router.post('/id/update', heroesFire.updateHeroId);
router.post('/guide/update/:id(^\d+$)', heroesFire.updateHeroGuidesById);
router.post('/guide/update/all', heroesFire.updateAllHeroGuides);

module.exports = router;


