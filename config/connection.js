const { connect, connection } = require('mongoose');

connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/socialnetworkDB');

module.exports = connection;