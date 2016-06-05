

var request = require('request');
var cheerio = require('cheerio');
var superagent = require('superagent');
var async = require('async');






var hfHomepageUrl = 'http://www.heroesfire.com';
var hfGuideUrl = 'http://www.heroesfire.com/hots/guides';
var guidesUrl = 'http://www.heroesfire.com/hots/guides';
var guideUrll = 'http://www.heroesfire.com/hots/guides?fHeroes=';
var guideUrlr ='&fType=Guide&fLanguage=&fCategory=&s=t';




var concurrencyCount = 0;
var heroIDs = [6,1000,1639,23,1001,392,963,1707,2037,1952,20
,19,10,1735,3,1808,9,1101,1392,1324,11];

var guidePages = [];






exports.guidesEachHero = function(req, res, next){

	guidePagingUrl(6, function(data){
		res.json(data);
	});

}






exports.guidePagingUrlColl = function(req, res, next){
	async.mapLimit(heroIDs, 5,  function(heroID, callback){
		//console.log(heroID);
		guidePagingUrl(heroID, callback);
	}, function(err, result){
		console.log(err);
		console.log('final:');
		console.log(result);
	});
	
}


























exports.heroId = function(req, res, next) {
	getHeroID(guidesUrl, function(data){
		res.json(data);
	
	})


}



exports.guides = function(req, res, next) {
	guideUrl(4, function(data){
		res.json(data);
	
	})


}





var getHeroID = function (url, callback) {
	superagent.get(guidesUrl)
		.end(function(err, ares){
			if (err){
				throw err;
				return;
			}
			var $ = cheerio.load(ares.text);
			//var IDs = [];
 
			$('.heroes span a').each(function (i, e) {
				id = $(e).attr('data-id');
				if ( typeof id != 'undefined') {
					var name = $(e).find('img').attr('src').split('/')[5].split('.')[0];
					heroIDs.push({Hero:name, ID: id})
				}
			});
			
			
			
			callback(heroIDs);
			

			  
		});


}






var guidePagingUrl = function(heroID, callback){
	var url = guideUrll + heroID + guideUrlr;
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

	superagent.get(hfHomepageUrl + url)
		.end(function (err, ares){
			if(err) {
				throw err;
				return;
			}
			
			var urls = [];
			
			var $ = cheerio.load(ares.text);
			
			var guideList = $('.browse-item-list a');
			
			guideList.each(function (i, e) {
				urls.push($(e).attr('href'));
			});
	
			//console.log(urls);
			callback(err, urls);
		
		});

}





var allGuides = function (url, callback) {

	superagent.get(hfHomepageUrl + url)
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



