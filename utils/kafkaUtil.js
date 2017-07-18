var express = require('express');
var router = express.Router();

var kafka = require('kafka-node'),
    Producer = kafka.Producer,
    client = new kafka.Client(applicationConfig["kafka.zkUrl"],"spiderActiveLuckyDraw",{
    requireAcks: 1,
    ackTimeoutMs: 100,
    partitionerType: 2}),
    producer = new Producer(client);
var KeyedMessage = kafka.KeyedMessage;
producer.on('ready', function () {
		    console.log("Send Msg ready")
		});
producer.on('error', function () {
		    console.log("Send Msg Error")
		});
class kafkaUtil{
	static sendMsg(payloads, callback){
		console.log("send kafka ing");
		producer.send(payloads, function (err, data) {
		    if (!!err){
		        console.log(err);

		    	console.log("send date err"+err);
			return;
		    }
		    console.log("send date"+data);
		    callback(data);
		});
	}
}


module.exports = kafkaUtil; 
