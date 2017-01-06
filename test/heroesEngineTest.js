var heroesFire = require('../lib/engine/heroesfire');
var assert = require('assert');
var app = require('../app');
var supertest = require('supertest');
var request = supertest(app);

var heroFixture = require('../test/fixtures/heroes.json');
var lili = heroFixture.find(x=>x.name='li-li');
var guideUrl = lili.guides[0].url;

describe('herores fire api test', function(){
	it('should return guides by hero id', function(done){
		request.get('/api/guide/all/li-li')
		.expect('Content-Type', /json/)
		.expect(200, lili, done);
	});
	
	it('should return sepecific guide by url', function(done){
		request.get('/api/guide/get?url=' + guideUrl)
		.expect('Content-Type', /json/)
		.expect(200, done);
	});
});


