var HeroesFireDB = require('../dataAccess/HeroesFireDB');

var heroesFireDB = new HeroesFireDB();

exports.renderIndex = function (req, res, next) {
	heroesFireDB.getAll({}, function(err, data){
		if (err) return next(err);
		res.render('index', {heroes: data});
	});

}
