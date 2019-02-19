const mongoose = require('mongoose');
const config = require('../config');

const db = mongoose.connection;
mongoose.Promise = global.Promise;

db.on('error', console.error.bind(console, 'connection error: '));

db.once('open', function() {
console.log('Connected to DB');
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

mongoose.connect(config.get('mongoose'), { useMongoClient: true });

module.exports = mongoose;
