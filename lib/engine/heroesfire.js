var request = require('request');
var cheerio = require('cheerio');
var superagent = require('superagent');
var async = require('async');


var GLOBAL = require('../../config/Global.js');
var HeroesFireDB = require('../dataAccess/HeroesFireDB');


var heroIdCol = [];
var guidePages = [];
var heroesFireDB = new HeroesFireDB();


exports.getGuidesByName = function (req, res, next) {
	//heroesFireDB.get({name: req.query.name}, function(data){
		//var hf_id = data['hf_id'];
		heroesFireDB.get({name: req.query.name} ,function(data){
			res.json(data['guides']);
		});
}


exports.singleGuide = function(req, res, next) {
	//var url = hfHomepageUrl + '/hots/guide/the-many-ways-of-abathur-1194';
	parsingGuide(url, function(data){
		res.json(data);
	});
}



exports.updateHeroIdCol = function (req, res, next) {
	getHeroID(GLOBAL.URL.HF.guides, function (data) {
		var len = data.length;
		for (var i = 0; i < len; i++) {
			heroesFireDB.update(
				{ hf_id: data[i]['id'] },
				{ name: data[i]['name'], hf_id: data[i]['id'] });
		}

		res.json({msg: "updated"});
	});

}



exports.updateHeroGuides = function (req, res, next) {
	var hf_id= req.query.id;
	guidePagingUrl(hf_id, function (data) {
		heroesFireDB.update({hf_id: hf_id}, {guides: data});
		res.json(data);
	});
}





var parsingGuide = function (url, callback) {
	superagent.get(url)
		.end(function (err, ares){
			if(err) {
				throw err;
				return;
			}
			
			
			var skills = [];
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
			
		
			
			var	result = {
				title: title,
				date: date,
				vote: vote,
				author: author,
				skills: skills
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
	superagent.get(GLOBAL.URL.HF.guides)
		.end(function(err, ares){
			if (err){
				throw err;
				return;
			}
			var $ = cheerio.load(ares.text);

			$('.heroes span a').each(function (i, e) {
				id = $(e).attr('data-id');
				if ( typeof id != 'undefined') {
				    var name = $(e).find('img').attr('src').split('/')[5].split('.')[0];
				    heroIdCol.push({
				        name: name,
                        id: id,
				    });

					//heroIdCol[name] = id;
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
	superagent.get(GLOBAL.URL.HF.home + url)
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
			    info['votes'] = $(e).find('div.rank').text().split(' ')[0];
			    info['date'] = $(e).find('div.created').text().split('Updated')[1].trim();
				urls.push(info);
			});


			callback(err, urls);
		});

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



