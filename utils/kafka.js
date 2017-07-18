var express = require('express');
var router = express.Router();

var kafka = require('./kafkaUtil.js');
   




router.get('/send', function(req, res, next) {
	
	var key = req.query.key;
	var val = req.query.val;
	var exTime = req.query.exTime;
	let payloads = [
		    { topic: 'SpiderMonitorTopic', messages: "testssssssssssssssssssssssssssssssssssssssss" }
		];

	kafka.sendMsg(payloads,function(result){
		res.send('send  key='+key+"   val="+val);
	});
});

router.get('/receive', function(req, res, next) {
	var key = req.query.key;
});

module.exports = router; 
