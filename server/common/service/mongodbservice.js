const {MongoClient} = require('mongodb');
const config = require('../../../config/appconfig.js');
const client = new MongoClient(config.mongo.url);

class MongoDBService {
    constructor() {
        this.connect();
    }
    
    async connect() {
        await client.connect();
        this.db = client.db(config.mongo.database);
        console.log('Connected successfully to mongodb server');
    }
};

module.exports = MongoDBService;
