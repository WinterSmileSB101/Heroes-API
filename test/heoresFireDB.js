const assert = require('assert');
var mongoClient = require('mongodb').MongoClient;
var HeroesFireDB = require('../lib/dataAccess/HeroesFireDB.js');




var heroesFireDB = new HeroesFireDB();
var environment = process.env.NODE_ENV || 'development';



describe('create instance of HeroesFireDB', function () {
		it('should initialize mongo db collection name', function () {
				assert.equal('heroes', heroesFireDB.colName);
    });
		

		it('should initialize mongo db connection url', function() {
				assert.equal( environment == 'development' ? 'mongodb://localhost:27017/heroes' : 'mongodb://chat:nodesimplechat@ds029615.mongolab.com:29615/nodesimplechat', heroesFireDB.dbConnectionUrl);
		});
		
		
		it('should initilized mongo db client', function() {
				assert.equal(mongoClient, heroesFireDB.mongoClient);
		});
		
});



describe('functions of HeroesFireDB', function () {
		it('should update document', function () {
				assert.equal('heroes', heroesFireDB.colName);
    });
		

		
});



