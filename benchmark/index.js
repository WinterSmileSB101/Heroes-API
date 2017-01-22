var assert = require('assert');
var Benchmark = require('benchmark');
var suite = new Benchmark.Suite;
var HeroesFireDB = require('../lib/dataAccess/HeroesFireDB');
var heroesFire = require('../lib/engine/heroesFire');
var util = require('util');

var heroesFireDB = new HeroesFireDB();


suite
	.add('HeroesFireDB: get guides by name',{
		defer: true,
		fn: function (deferred) {
				heroesFireDB.get({name: 'li-li'}, function(){
					deferred.resolve();
				});
		}
	})
	.add('HeroesFireDB: get sorted guides by votes',{
		defer: true,
		fn: function (deferred) {
				heroesFireDB.getSorted({name: 'li-li'}, 'votes', function(){
					deferred.resolve();
				});
		}
	})
	.add('HeroesFireDB: get sorted guides by date',{
		defer: true,
		fn: function (deferred) {
				heroesFireDB.getSorted({name: 'li-li'}, 'date', function(){
					deferred.resolve();
				});
		}
	})
	.on('cycle', function(event) {
		console.log(String(event.target));
		console.log(util.inspect(process.memoryUsage()));
	})
	.on('complete', function(){
		console.log('results: ');
		this.forEach(function (result){
			console.log(result.name, result.count, result.times.elapsed);
		});
	})
	.run();
