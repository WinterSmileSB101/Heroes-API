var mongoClient = require('mongodb').MongoClient;
var environment = process.env.NODE_ENV || 'development';
var GLOBAL = require('../../config/Global');


var HeroesFireDB = function () {

		this.colName = GLOBAL.NAME.MONGO.col;
    this.mongoClient = mongoClient;
		this.dbConnectionUrl = GLOBAL.URL.MONGO.dev;
	
		if ( environment === 'production') {
        this.dbConnectionUrl = GLOBAL.URL.MONGO.production;
    }

	
}


HeroesFireDB.prototype.insert = function (data) {
    this.mongoClient.connect(this.dbConnectionUrl, function (err, db) {
        if (err) throw err;
        _insertDocument(db, data, function () {
            db.close();
        });
    });
}


function _insertDocument(db, data, callback) {
    var col = db.collection('heroes');
    col.insertOne(data, function (err, result) {
        if (err) throw err;
        callback(result);
    });
}



HeroesFireDB.prototype.update = function (query, set) {
		var colName = this.colName;
    this.mongoClient.connect(this.dbConnectionUrl, function (err, db) {
        if (err) throw err;
        _updateDocument(db, query, set, colName, function () {
            db.close();
        });
    });
}


function _updateDocument (db, query, set, colName, callback) {
	var col = db.collection(colName);
	col.updateOne(query, {$set: set});
};


HeroesFireDB.prototype.get = function(query, callback) {
	var colName = this.colName;
	this.mongoClient.connect(this.dbConnectionUrl, function(err, db) {
		if(err) throw err;
		_getDocument(db, query, colName, function(data) {
			db.close();
			callback(data);
		});
	});
}



var _getDocument = function (db, query, colName, callback){
	var cursor =db.collection(colName).find(query);
	var result = {};
	cursor.each(function(err, doc) {
		if (doc != null) {
			console.dir(doc);
			result = doc;
		} else {
			callback(result);
		}
	});
	
	
}




module.exports = exports = HeroesFireDB;