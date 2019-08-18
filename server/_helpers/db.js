const config = require('config.json');
const mongoose = require('mongoose');
const connectionString = `mongodb://${config.dbusername}:${config.dbpassword}@${config.dburl}/${config.db}`;
mongoose.connect(connectionString, { useCreateIndex: true, useNewUrlParser: true });
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../src/user/user.model'),
    Roles: require('../src/roles/roles.model')
};

// "connectionString": "mongodb://<dbuser>:<dbpassword>@ds263917.mlab.com:63917/ecommerce"
