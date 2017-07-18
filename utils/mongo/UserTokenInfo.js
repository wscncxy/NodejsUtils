var mongoose = require('./mongoDBUtil.js');
var Schema = mongoose.Schema;

var UserTokenInfoLogSchema = new Schema({
    userId: String,
    actId: String,
    token: String,
    program: String,
    reason: String,
    descript: String,
    status: String,
    phone:String,
    addTime: Number
}, { collection: 'UserTokenInfoLog'});

module.exports = mongoose.model('UserTokenInfoLog', UserTokenInfoLogSchema);
