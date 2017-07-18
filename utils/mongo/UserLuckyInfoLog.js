var mongoose = require('./mongoDBUtil.js');
var Schema = mongoose.Schema;

var UserLuckyInfoLogSchema = new Schema({
    userId: String,
    actId: String,
    giftSign: String,
    giftId: String,
    giftName: String,
    token: String,
    status: String,
    descript: String,
    phone:String,
    addTime: Number
}, { collection: 'UserLuckyInfoLog'});

module.exports = mongoose.model('UserLuckyInfoLog', UserLuckyInfoLogSchema);
