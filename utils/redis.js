var express = require('express');
var router = express.Router();

var redis = require('./redisUtil.js');

router.get('/set', function(req, res, next) {
	var key = req.query.key;
	var val = req.query.val;
	var exTime = req.query.exTime;
	redis.setVal(key,val,exTime);
	err = exTime % 1 === 0;
	res.render('redis/index', { key: key,val:val,exTime:exTime,err:err,title:null});
});

router.get('/get', function(req, res, next) {
	var key = req.query.key;
	
  redis.getVal(key,function (err, result) {			
 		res.render('redis/index', { key:key,val:result,err:err,exTime:null});
	});
  	 
});

router.get('/rpush', function(req, res, next) {
	var key = req.query.key;
	var val = req.query.val;
	var exTime = req.query.exTime;
  redis.rpush(key,val,exTime);
  	 res.render('redis/index', { key: key,val:val,exTime:exTime,err:"",title:null});
});

router.get('/lpop', function(req, res, next) {
	var key = req.query.key;
	
  redis.lpop(key,function (err, result) {			
 		res.render('redis/index', { key:key,val:result,err:err,exTime:null});
	});
  	 
});

module.exports = router;
