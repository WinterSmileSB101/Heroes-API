var heroesFire = require('../lib/engine/heroesfire');
var assert = require('assert');
var app = require('../app');
var supertest = require('supertest');
var request = supertest(app);

var heroFixture = require('../test/fixtures/heroes.json');
var sortedHeroFixture = require('../test/fixtures/sortedHeroes.json');
var lili = heroFixture.find(x=>x.name='li-li');
var guideUrl = lili.guides[0].url;

describe('herores fire api test', function(){
	it('should response with 404 invalid url', function(done){
		request.get('/api/invalid/')
		.expect(404, {}, done);
	});
	
	it('should return guides by hero id', function(done){
		request.get('/api/guide/all/li-li')
		.expect('Content-Type', /json/)
		.expect(200, lili, done);
	});

	it('should response with 404 invalid hero name', function(done){
		request.get('/api/guide/all/vall')
		.expect(404, {}, done);
	});
	
	it('should return guides by hero id with sort by votes', function(done){
		request.get('/api/guide/all/li-li?sort=votes')
		.expect('Content-Type', /json/)
		.expect(200, sortedHeroFixture['votes'], done);
	});
	
	it('should return guides by hero id with sort by date', function(done){
		request.get('/api/guide/all/li-li?sort=date')
		.expect('Content-Type', /json/)
		.expect(200, sortedHeroFixture['date'], done);
	});
	
	it('should return sepecific guide by url', function(done){
		setTimeout(done, 3000);
		request.get('/api/guide/get?url=' + guideUrl)
		.expect('Content-Type', /json/)
		.expect(200, done);
	});
});


