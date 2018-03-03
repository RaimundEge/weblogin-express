const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const config = require('./config');

// Connection URL
const url = config.MongoURL;

// Database Name
const dbName = 'test';

// Database references
var conn;
var db;

module.exports = {
  connect: function() {
    // Use connect method to connect to the server
    MongoClient.connect(url, function(err, client) {
      assert.equal(null, err);
      conn = client;
      db = client.db(dbName);
      console.log("Connected successfully to server");
    })
  },
  close: function() {
    connect.close();
  },
  getDB: function() {
    return db;
  }
}