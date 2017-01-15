var express = require('express');
var router = express.Router();
var viewEngine = require('../lib/engine/viewEngine');

/* GET home page. */
router.get('/', viewEngine.renderIndex);


module.exports = router;
