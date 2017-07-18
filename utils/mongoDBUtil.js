var mongoose = require('mongoose');
var DB_URL = 'mongodb://192.168.10.180:27017/spider_selfmark';
mongoose.Promise = require('bluebird');
/**
 * 连接
 */
var opts = {
    db: { native_parser: true,slaveOk:false },
    server: {
        poolSize: 5 ,
        auto_reconnect: true,
        socketOptions: {keepAlive: 1}
    },
    replset: { rs_name: 'gabriel' }
}
mongoose.connect(DB_URL);

/**
  * 连接成功
  */
mongoose.connection.on('connected', function () {
    mongoose.slaveOk=false;
    console.log('Mongoose connection open to ' + DB_URL);  
});    

/**
 * 连接异常
 */
mongoose.connection.on('error',function (err) {    
    console.log('Mongoose connection error: ' + err);  
});    
 
/**
 * 连接断开
 */
mongoose.connection.on('disconnected', function () {    
    console.log('Mongoose connection disconnected');  
});

module.exports = mongoose;
