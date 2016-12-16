var mongoClient = require('mongodb').MongoClient;
var environment = process.env.NODE_ENV || 'development';
var GLOBAL = require('../../config/Global');

var FireDataAccess = function () {

  
    var dbConnectionUrl;

    //init url for mongodb

    if ( environment === 'development') {
        dbConnectionUrl = GLOBAL.URL.MONGO.dev;
    }
    if ( environment === 'production') {
        dbConnectionUrl = GLOBAL.URL.MONGO.production;
    }




    this.collectionName = GLOBAL.NAME.MONGO.col;
    this.mongoClient = mongoClient;
    this.dbConnectionUrl = dbConnectionUrl;

}

FireDataAccess.prototype.insert = function (data) {
    this.mongoClient.connect(this.dbConnectionUrl, function (err, db) {
        if (err) throw err;
        _insertDocument(db, data, function () {
            db.close();
        });
    });
}


function _insertDocument(db, data, callback) {
    var col = db.collection(this.collectionName);
    col.insertOne(data, function (err, result) {
        if (err) throw err;
        callback(result);
    });

}



db.prototype.update = function (query, set) {
    this.mongoClient.connect(this.url, function (err, db) {
        if (err) throw err;
        updateMessages(db, query, set, function () {
            db.close();
        });
    });
}



function _updateDocument (db, query, set, callback) {
    var col = db.collection(this.collectionName);
    col.updateMany(query, set, function (err, results) {
        if (err) throw err;
        callback(results);
    });
};







module.exports = exports = FireDataAccess;