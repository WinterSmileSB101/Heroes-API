const assert = require('assert');
var mongoClient = require('mongodb').MongoClient;
var HeroesFireDB = require('../lib/dataAccess/HeroesFireDB');
var heroFixture = require('../test/fixtures/heroes.json');

var heroesFireDB = new HeroesFireDB();
var environment = process.env.NODE_ENV || 'development';

var mockData = {'li-li': '', 'vallla': '' };


describe('create instance of HeroesFireDB', function () {
		it('should initialize mongo db collection name', function () {
				assert.equal('heroes', heroesFireDB.colName);
    });
		
		it('should initialize mongo db connection url', function() {
				assert.equal( environment == 'development' ? 'mongodb://localhost:27017/test' : 'mongodb://chat:nodesimplechat@ds029615.mongolab.com:29615/nodesimplechat', heroesFireDB.dbConnectionUrl);
		});
		
		
		it('should initilized mongo db client', function() {
				assert.equal(mongoClient, heroesFireDB.mongoClient);
		});
		
});

describe('functions of HeroesFireDB', function () {
	
		before(function(done){
			heroesFireDB.get({"name": "li-li"} ,function(data){
				mockData['li-li'] = data;
				process.nextTick(done);
			});

		});

		it('should get document', function () {
			assert.deepEqual(mockData['li-li'], heroFixture.find(x=>x.name='li-li'));
    });
});


describe('functions of HeroesFireDB', function () {
	
		before(function(done){
			heroesFireDB.update({"name": "valla"}, {"name": "valla", hf_id: 11}, function(){
				heroesFireDB.get({"name": "valla"} ,function(data){
					mockData['valla'] = data;
					process.nextTick(done);
				});
			});
		});

		it('should get an updated document', function () {
				assert.equal(mockData['valla'].hf_id, 11);
				assert.equal(mockData['valla'].name, 'valla');
		});

});











