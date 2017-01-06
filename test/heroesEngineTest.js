var heroesFire = require('../lib/engine/heroesfire');
var assert = require('assert');
var app = require('../app');
var supertest = require('supertest');
var request = supertest(app);



describe('herores fire engine test', function(){
	it('should return guides by hero id', function(done){
		request.get('/api/guide/all/li-li')
		.end(function (err, res) {
			assert.equal(res.statusCode, 200);
			done(err);
		});
	});
});




