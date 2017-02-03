var express = require('express');
var router = express.Router();
var hero = require('../lib/engine/hero');
var heroesFire = require('../lib/engine/heroesfire');

router.put('/id/update', heroesFire.updateHeroId);
router.put('/guide/update/:id', heroesFire.updateHeroGuidesById);
router.put('/guides/update/', heroesFire.updateAllHeroGuides);

module.exports = router;


