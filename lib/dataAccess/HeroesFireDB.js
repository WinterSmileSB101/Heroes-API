var mongoClient = require('mongodb').MongoClient;
var environment = process.env.NODE_ENV || 'development';
var GLOBAL = require('../../config/Global');
var colName = GLOBAL.NAME.MONGO.col;

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
	var col = db.collection(colName);
	col.insertOne(data, function (err, result) {
		if (err) throw err;
			callback(result);
	});
}


HeroesFireDB.prototype.insertMany = function (data, callback) {
	this.mongoClient.connect(this.dbConnectionUrl, function (err, db) {
		if (err) throw err;
		_insertManyDocument(db, data, function (result) {
			callback(result);
			db.close();
		});
	});
}


function _insertManyDocument(db, data, callback) {
	var col = db.collection('heroes');
	col.insertMany(data, {upsert: true}, function (err, result) {
		if (err) throw err;
			callback(result);
	});
}



HeroesFireDB.prototype.update = function (query, set, callback) {
	this.mongoClient.connect(this.dbConnectionUrl, function (err, db) {
		if (err) throw err;
		_updateDocument(db, query, set, function (result) {
			db.close();
			callback(result);
		});
	});
}


function _updateDocument (db, query, set, callback) {
	var col = db.collection(colName);
	col.updateOne(query, {$set: set}, {upsert: true}, function(err, result) {
		if(err) throw err;
		callback(result);
	});
};



HeroesFireDB.prototype.updateMany = function (query, set, callback) {
	this.mongoClient.connect(this.dbConnectionUrl, function (err, db) {
		if (err) throw err;
		_updateDocument(db, query, set, function (result) {
			db.close();
			callback(result);
		});
	});
}


function _updateManyDocument (db, query, set, callback) {
	var col = db.collection(colName);
	col.updateMany(query, set, {upsert: true}, function(err, result) {
		if(err) throw err;
		callback(result);
	});
};


HeroesFireDB.prototype.get = function(query, callback) {
	this.mongoClient.connect(this.dbConnectionUrl, function(err, db) {
		if(err) {
			callback(err, null);
			return;
		}
		_getDocument(db, query, function(err, data) {
			if (err) return callback(err, null);
			db.close();
			callback(null, data);
		});
	});
}


var _getDocument = function (db, query, callback){
	var cursor = db.collection(colName).find(query, {_id: 0});
	var result = {};
	cursor.each(function(err, doc) {
		if (err) {
			callback(err, null);
			return;
		}
		if (doc != null) {
			//console.dir(doc);
			result = doc;
		} else {
			callback(null, result);
		}
	});
}


HeroesFireDB.prototype.getAll = function(query, callback) {
	this.mongoClient.connect(this.dbConnectionUrl, function(err, db) {
		if(err) {
			callback(err, null);
			return;
		}
		_getAllDocument(db, query, function(err, data) {
			if (err) return callback(err, null);
			db.close();
			callback(null, data);
		});
	});
}


var _getAllDocument = function (db, query, callback){
	var cursor = db.collection(colName).find(query, {_id: 0});
	var result = [];
	cursor.each(function(err, doc) {
		if (err) return callback(err, null);
		if (doc != null) {
			//console.dir(doc);
			result.push(doc);
		} else {
			callback(null, result);
		}
	});
}


HeroesFireDB.prototype.getSorted = function(query, sortCondition, callback) {
	this.mongoClient.connect(this.dbConnectionUrl, function(err, db) {
		if(err) {
			callback(err, null);
			return;
		}
		_getSortedDocument(db, query, sortCondition, function(err, data) {
			db.close();
			callback(err, data);
		});
	});
}


var _getSortedDocument = function(db, query, sortCondition, callback){
	sortCondition = 'guides.' + sortCondition;
	var sort = {};
	sort[sortCondition] = -1;
	db.collection(colName).aggregate([{$match:  query}, {$unwind: '$guides'}, {$sort: sort},{$group: {_id: null, name: {$first: '$name'}, hf_id:{$first:'$hf_id'}, guides: {$push:'$guides'}}} ]).toArray(function(err, result) {
		if(err) {
			callback(err, null);
			return;
		}
		//TODO:this is really dirty..
		var res = {'message': 'Not Found',status: 404};
		if(result[0] == null) {
			callback(res, null);
			return;
		} else {
			delete result[0]._id;
			res = result[0];
		}
		callback(null, res);
	});
}


HeroesFireDB.prototype.operateAll = function(query, handler){
	this.mongoClient.connect(this.dbConnectionUrl, function(err, db) {
		var stream = db.collection('heroes').find(query).stream();
		
		stream.on("data", function(item) {
			stream.pause();
			handler(item, function() {
				stream.resume();
			});
		});
		
	});
}


module.exports = exports = HeroesFireDB;