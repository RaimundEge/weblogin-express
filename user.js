const mongoUtil = require( './mongoUtils' );

mongoUtil.connect();

module.exports = {
    getAll: function(callback) {
        console.log('getAll');
        const col = mongoUtil.getDB().collection('users');
        col.find({}).toArray().then(callback);    
    },
    find: function(username, callback) {
        console.log('find: ' + username);
        const col = mongoUtil.getDB().collection('users');
        col.find({'username': username}).toArray(callback);
    },
    insert: function(req, callback) {
        console.log('inserting: ' + req.body.username);
        const col = mongoUtil.getDB().collection('users');
        col.insertOne({"username": req.body.username, "fullname": req.body.fullname, "password": req.body.password}, callback);
    },
    update: function(username, body, callback) {
        console.log('updating: ' + username);
        const col = mongoUtil.getDB().collection('users');
        col.updateMany({"username": username}, {$set: {"fullname": body.fullname}}, callback);
    },
    remove: function(username, callback) {
        console.log('deleting: ' + username);
        const col = mongoUtil.getDB().collection('users');
        col.deleteMany({"username": username}, callback);
    }
}