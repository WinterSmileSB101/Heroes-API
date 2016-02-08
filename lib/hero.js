var homepageUrl = 'http://us.battle.net/heroes/en/';
var http = require('http');
var request = require('request');
var cheerio = require('cheerio');

var baseUrl = 'http://us.battle.net';



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
		res.json(data);
	});
	
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
