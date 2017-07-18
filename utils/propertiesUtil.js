var fs = require('fs');

exports.readApplicationproperties = function(uri, encoding){
	var encoding = encoding==null?'UTF-8':encoding;  //定义编码类型
	console.log("开始读取系统配置");
	try {
		var content = fs.readFileSync(uri, encoding);
		var regexjing = /\s*(#+)/;  //去除注释行的正则
		var regexkong = /\s*=\s*/;  //去除=号前后的空格的正则
		var keyvalue = {};  //存储键值对

		var arr_case = null;
		var regexline = /.+/g;  //匹配换行符以外的所有字符的正则
		while(arr_case=regexline.exec(content)) {  //过滤掉空行
            arr_case=arr_case.toString().trim();
			if (arr_case.indexOf("#")!=0) {  //去除注释行
				let theKey=arr_case.toString().split(regexkong)[0].trim();
				let theVal=arr_case.toString().split(regexkong)[1].trim();
                theVal = theVal.split("#")[0].trim();
				keyvalue[theKey]=theVal;  //存储键值对
				console.log(arr_case+"键值对"+theKey+":"+theVal);
			}
		}
        console.log("成功！读取系统配置");
	} catch (e) {
		//e.message  //这里根据自己的需求返回
        console.log("失败！读取系统配置"+e.message);
		return null;
	}
	return keyvalue;
}
