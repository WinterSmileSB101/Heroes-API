var request = require('request');
var cheerio = require('cheerio');
var superagent = require('superagent');
var async = require('async');
var GLOBAL = require('../../config/Global.js');
var HeroesFireDB = require('../dataAccess/HeroesFireDB');
var fs = require('fs');
var Readable = require('stream').Readable;
var heroFixture = require('../../test/fixtures/heroes.json');


var heroIdCol = [];
var guidePages = [];
var heroesFireDB = new HeroesFireDB();


exports.getAllGuideByName = function (req, res, next) {
	var sortCondition = req.query['sort'];
	heroesFireDB.getSorted({name: req.params['name']} ,sortCondition, function(data){
		res.json(data);
	});
	
}


exports.getGuideDetail = function(req, res, next) {
	_parseGuide(req.query['url'], next, function(data){
		res.json(data);
	});
}


exports.updateHeroId = function (req, res, next) {
	getHeroID(GLOBAL.URL.HF.guides, function (data) {
		for (var i = 0; i < data.length; i++) {
			heroesFireDB.update(
				{ hf_id: parseInt(data[i]['id']) },
				{ name: data[i]['name'], hf_id:  parseInt(data[i]['id']) },
				function(data) {
	
				});
		}
		res.json({msg: 'Hero ID and name have been updated.'});
	});

}

exports.getAllHeroes = function(req, res, next) {
	var counter = 0;
	var rs = new Readable;
	res.setHeader("Content-Type", "appliction/json");
	heroesFireDB.operateAll(null, function(data, callback){
		if (data) {
			res.write(JSON.stringify(data));
		} else {
			res.end();
		}
		callback();
	});
}


exports.updateHeroGuidesById = function (req, res, next) {
	var hf_id= req.params.id;
	guidePagingUrl(hf_id, function (data) {
		heroesFireDB.update({hf_id: parseInt(hf_id)}, {guides: data}, function(data) {
			res.json({msg:'guides of hero#' +  hf_id  +'has been updated.'});
		});
	});
}


exports.updateAllHeroGuides = function(req, res, next) {
	heroesFireDB.get(null, function(data){
		for (var i = 0; i < data.length; i++){
			guidePagingUrl(data[i].hf_id, function (data) {
				heroesFireDB.update({hf_id: data[i].hf_id}, {guides: data});
			});
		}
		res.json('done');
	});
}


function _parseGuide (url, next, callback) {
	var requestUrl = url.startsWith('http') ? url : GLOBAL.URL.HF.home + url;
		superagent.get(requestUrl)
		.end(function (err, ares){
			if(err) {
				console.log('Error: ', err.message);
				return next(err);
			}
			
			var skills = [];
			var threats = [];
			var $ = cheerio.load(ares.text);
			var title = $('.guide-header .desc h2').text();
			var date = $('.date span:last-child').text();
			var vote = $('._vote-count').text();
			var author = $('.date span:first-child').text().trim();
			
			$('.skills').first().find('.level').each(function (i, e) {
				var level = $(e).text().trim();
				var src_str = $(e).find('img').attr('src').split('/');
				var skill_name = src_str[src_str.length-1].split('.')[0];
				skills.push({level: level, skill: skill_name});

			});
			
			$('.threats').first().find('.ajax-tooltip').each(function(i, e){
				var threat = $(e).attr('src').split('/', -1).slice(-1)[0].slice(0, -4);
				threats.push(threat);
			});
		
			var	result = {
				title: title,
				date: date,
				vote: vote,
				author: author,
				skills: skills,
				threats: threats
			}
			callback(result);
		});

}










exports.guidePagingUrlColl = function(req, res, next){
    async.mapLimit(heroIdCol, 5, function (heroID, callback) {
		guidePagingUrl(heroID, callback);
	}, function(err, result){
		console.log(err);
		console.log('final:');
		console.log(result);
	});
	
}





exports.heroId = function(req, res, next) {
    getHeroID(GLOBAL.URL.HF.guides, function (data) {

        res.json(data);

    });


}



exports.guides = function(req, res, next) {
	guideUrl(4, function(data){
		res.json(data);
	
	})


}





var getHeroID = function (url, callback) {
	var requestUrl = GLOBAL.URL.HF.guides;
	superagent.get(requestUrl)
		.end(function(err, ares){
			if (err){
				throw err;
				return;
			}
			var $ = cheerio.load(ares.text);

			$('.heroes span a').each(function (i, e) {
				id = $(e).attr('data-id');
				
				if (typeof id != 'undefined') {
				    var name = $(e).find('img').attr('src').split('/')[5].split('.')[0];
				    heroIdCol.push({
							name: name,
							id: id
						});
				}
				
			});
			
			callback(heroIdCol);
		});
	
}





//find urls for paging
var guidePagingUrl = function(heroID, callback){
	var url = GLOBAL.URL.HF.guides_l + heroID + GLOBAL.URL.HF.guides_r;
	superagent.get(url)
		.end(function(err, ares){
			
			if (err){
				throw err;
				return;
			}
			
			
			var urls = [];
			var pagingUrls = [];
			var $ = cheerio.load(ares.text);
			var guidePagesUrl = $('#paging a').not(':last-child');
			
			
			
			if (guidePagesUrl.length == 0) {
				pagingUrls.push(url);
			} else {
				guidePagesUrl.each(function (i,e){
					pagingUrls.push($(e).attr('href'));
				});
			}
			
	


            //guide url
			guideUrls(pagingUrls, function(data){
				//console.log(data);
				callback(data);
			
			});
			
			
			
			
			/**
			for (var i = 0; i < pagingUrls.length; i++) {
				guideUrls(pagingUrls[i], function(data){
					urls = urls.concat(data);
					if(i == pagingUrls.length){
						callback(urls);
					}
				});
			}
			**/
			
			
			
	});
	
}




var guideUrls = function (pagingUrls, callback) {


	//concatSeries(coll, iteratee, [callback])
	async.concatSeries(pagingUrls, function(pagingUrl, callback){
		onePageUrls(pagingUrl, callback);
	}, function(err, result){
		callback(result);
	});

	
	
	/**
	async.mapLimit(pagingUrls, pagingUrls.length, function(pagingUrl, callback){
		onePageUrls(pagingUrl, callback);
	}, function(err, result){
		callback(result);
	});
	**/
	
	
}







var onePageUrls = function(url, callback) {
	var requestUrl = url.startsWith('http') ? url : GLOBAL.URL.HF.home + url;
	superagent.get(requestUrl)
		.end(function (err, ares){
			if(err) {
				throw err;
				return;
			}
			
			var urls = [];


			
			var $ = cheerio.load(ares.text);
			
			
			var guideList = $('.browse-item-list a');
			
			guideList.each(function (i, e) {
				var info = {};
				info['url'] = $(e).attr('href');
				info['votes'] = parseInt($(e).find('div.rank').text().split(' ')[0]);
				info['date'] = _parseDate($(e).find('div.created').text().split('Updated')[1].trim());
				urls.push(info);
			});


			callback(err, urls);
		});

}

function _parseDate(data) {
	
	if ( isNaN(Date.parse(data)))  return data;
	return new Date( Date.parse(data) ).toISOString().split('T')[0];
}



var allGuides = function (url, callback) {

    superagent.get(GLOBAL.URL.HF.home + url)
		.end(function (err, ares){
			if(err) {
				throw err;
				return;
			}
			
			
			var urls = [];
			var $ = cheerio.load(ares.text);
			var num = $('#paging a:last-child').prev('a').html();
			
			for (var i = 1; i <= num; i++){
			
			}
			console.log(urls);
			callback(urls);
		
		});


	

}



