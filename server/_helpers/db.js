const config = require('config.json');
const mongoose = require('mongoose');
const connectionString = `mongodb://${config.dbusername}:${config.dbpassword}@${config.dburl}/${config.db}`;
mongoose.connect(connectionString, { useCreateIndex: true, useNewUrlParser: true });
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../src/user/user.model')
};

// "connectionString": "mongodb://jayaraj8905:27052915@ds155577.mlab.com:55577/emaily",