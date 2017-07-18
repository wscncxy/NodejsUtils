var express = require('express');

var ResultCode = require('./ResultCode.js');
var http=require('http');
var querystring=require('querystring');
class httpUtils {

	static post(host,port,path,params,callback){
        let httpTimeout;
		//发送 http Post 请求
		var postData=JSON.stringify(params);
        var options = {
            hostname: host,
            port: port,
            path: path,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData)
            }
        };
        console.log("请求数据:"+JSON.stringify(postData));
        console.log("请求canshu:"+JSON.stringify(postData));
        console.log("请求options:"+JSON.stringify(options));
        var req=http.request(options, function(res) {
            console.log('Status:',res.statusCode);
            console.log('headers:',JSON.stringify(res.headers));
            res.setEncoding('utf8');
            res.on('data',function(data){
                console.log('body分隔线---------------------------------\r\n');
                console.log(data);
                clearTimeout(httpTimeout);
                callback(ResultCode.getSuccess(data));
            });
            res.on('end',function(){
                console.log('No more data in response.********');
            });
        });
        // console.log("======================"+req.header());
        req.on('error',function(err){
            console.error(err);
            callback(ResultCode.getFailMsg(err));
            clearTimeout(httpTimeout);
        });
        req.on('timeout',function(e){
            console.log("超时了！！！！！");

            req.abort();
            callback(ResultCode.getFailMsg("超时"));
        });
        req.write(postData);
        req.end();


        httpTimeout = setTimeout(function(){
            req.emit('timeout',{message:'have been timeout...'});
        },20000);

    }

}

module.exports = httpUtils;
