const assert = require('assert');
var HeoresFireDB = require('../lib/dataAccess/fireDataAccess.js');

var heroesFireDB = new HeoresFireDB();

describe('create instance of HeroesFireDB', function () {
    it('should initialize mongo db collection name', function () {
        assert.equal('heroes', heroesFireDB.colName);
    });
});