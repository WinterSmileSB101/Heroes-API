var supertest = require('supertest');
var assert = require('assert');
var app = require('../app');
var request = supertest(app);
//var viewEngine = require('../lib/engine/viewEngine');

/**
describe('view engine test', function(){
	it('should render index', function(done){
		request.get('/')
		.expect('Content-Type', 'text/html; charset=utf-8')
		.expect(200,{}, done);
	});

});
**/