var homepageUrl = 'http://us.battle.net/heroes/en/';
var hfHomepageUrl = 'http://www.heroesfire.com/';
var request = require('request');
var cheerio = require('cheerio');
var superagent = require('superagent');
var eventproxy = require('eventproxy');





var guidesUrl = 'http://www.heroesfire.com/hots/guides';
var guideUrll = 'http://www.heroesfire.com/hots/guides?fHeroes=';
var guideUrlr ='&fType=Guide&fLanguage=&fCategory=&s=t';





var heroIDs = [];
var guidePages = [];



exports.get = function(req, res, next){
	var heroname = req.query['name'];
	var u = 'http://us.battle.net/heroes/en/heroes/' + heroname + '/';
	heroInfo(u, function (data) {
		if(data['error']) res.statusCode = 404;
		res.json(data);
	});
	
}





exports.getAll = function(req, res, next){
	heroLinks(homepageUrl, function(data){
		console.log(data);
		res.json(data);
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
	
	var ep = new eventproxy();
	ep.after('', heroIDs.length, function(heroUrl) {
	
	
	
	});
	
	
	
	var url = guideUrll + heroID + guideUrlr;
	superagent.get(url)
		.end(function(err, ares){
			if (err){
				throw err;
				return;
			}
			var $ = cheerio.load(ares.text);
			
			var guidePagesUrl = $('#paging a').not(':last-child');
			
		
			guidePagesUrl.each(function (i, e) {
				guidePages.push($(e).attr('href'));
			});
			
			
			callback(guidePages);
			
		});
	
}



var guideUrl = function(url, callback){
	
	

}




var guideInfo = function(url, callback){
	


}


var heroInfo = function (url, callback) {

    request(url, function (err, res, body) {
        if (err) throw err;
		if (res.statusCode == 404){
			callback({error: 'hero not found'});
			return;
		}
        var $ = cheerio.load(body);
        var name = $('.hero-identity__name').html().replace(/\s/g, '');;
        var infoSet = $('.info-container');
        var avatar = baseUrl + $('.skin-list__thumbnail').attr('src');
        var description = $('.hero-description').html();
		var type =$('.hero-role').text().replace(/\s/g, '');
 
        var stat = [];
        infoSet.each(function (i, info) {
            stat.push(($(info).find('.stat-bar-container').attr('class')).split(' ')[1].substr(4));
 
        });
 
        var info = {
            name: name,
            description: description,
            Damage: stat[0],
            Utility: stat[1],
            Survivability: stat[2],
            Complexity: stat[3],
			type: type,
            images: [
                avatar
            ],
            reviews: [{
 
            }
            ]
        }
         
        callback(info);
 
    });
 
}
 
 
var heroLinks = function (url, callback) {
	request(url, function (err, res, body) {
        if (err) throw err;
        var $ = cheerio.load(body);
        var links = $('.js-hero-thumbnail');
		var info = [];
		
        links.each(function (i, link) {
			var url = $(link).attr('href');
			url = 'http://us.battle.net' + url;
			heroInfo(url, function (data) {
				info.push(data);
				if(info.length == links.length)	callback(info);
			});
        });
 
 
 
	});
 
}



