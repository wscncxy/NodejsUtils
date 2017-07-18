
class ResultCode{

    static getResultCode(success,msg,data){
        let resultCode = {};
        resultCode.success=success;
        resultCode.msg=msg;
        resultCode.data=data;
        return resultCode;
    }
	static getSuccessMsg(msg,data){
		return this.getResultCode(true, msg, data);
	}

	static getSuccess(data){
		return this.getResultCode(true,"success",data);
	}

	static getFailMsg(msg){
		return this.getResultCode(false, msg,null);
	}

	static getFail(){
		return this.getResultCode(false,"fail",null);
	}

	//callBack
    static getSuccessMsgCallback(msg,data,req){
        return req.query.callback+"("+JSON.stringify(this.getSuccessMsg(msg, data))+")";
    }

    static getSuccessCallback(data,req){
        return req.query.callback+"("+JSON.stringify(this.getSuccess(data))+")";
    }

    static getFailMsgCallback(msg,req){
        return req.query.callback+"("+JSON.stringify(this.getFailMsg(msg))+")";
    }

    static getFailCallback(req){
        return req.query.callback+"("+JSON.stringify(this.getFail())+")";
    }

}

module.exports = ResultCode; 
