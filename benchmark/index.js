var assert = require('assert');
var Benchmark = require('benchmark');
var suite = new Benchmark.Suite;
var HeroesFireDB = require('../lib/dataAccess/HeroesFireDB');
var heroesFireDB = new HeroesFireDB();
var heroesFire = require('../lib/engine/heroesFire');

suite
	.add('HeroesFireDB get guides by name',{
		defer: true,
		fn: function (deferred) {
				heroesFireDB.get({name: 'li-li'}, function(){
					deferred.resolve();
				});
		}
	})
	.add('HeroesFireDB get sorted guides by name',{
		defer: true,
		fn: function (deferred) {
				heroesFireDB.getSorted({name: 'li-li'}, 'votes', function(){
					deferred.resolve();
				});
		}
	})
	.on('complete', function(){
		console.log('results: ');
		this.forEach(function (result){
			console.log(result.name, result.count, result.times.elapsed);
		});
	})
	.run();