var Redis = require('ioredis');

var cluster = new Redis.Cluster(JSON.parse(applicationConfig["redis.url"]));

class redisUtil {
    static getKey(mainKey, field1, field2){
        return mainKey + ":" + field1 + ":" + (field2 == null ? "" : field2);
    }

    static setVal(key, val, exTime, callBack){
        if (exTime % 1 === 0 && exTime > 0) {
            cluster.set(key, val);
            cluster.expire(key, exTime);
        } else if (exTime == 0) {
            cluster.set(key, val);
        } else {
            cluster.set(key, val, exTime);
        }
        callBack();
    }

    static setNXVal(key, val, exTime, callBack){
        if (exTime % 1 === 0 && exTime > 0) {
            cluster.setnx(key, val, function (err, resCode){
                console.log("key=" + key + "-" + resCode + "-" + exTime);
                cluster.expire(key, exTime);
                console.log(err);
                callBack(resCode);
            });
        } else if (exTime == 0) {
            cluster.setnx(key, val, function (err, resCode){
                console.log("key2=" + key + ":" + resCode);
            });
        } else {
            cluster.setnx(key, val, exTime, function (err, resCode){
                console.log("key3=" + key + ":" + resCode);
            });
        }

    }

    static getVal(key, callBack){
        cluster.get(key, function (err, result){
            if (Buffer.byteLength(result, 'utf8') > 0) {
                callBack(err, result);
            } else {
                cluster.get(key, function (err, result){
                    callBack(err, result);
                });
            }
        });
    }

    static setHMVal(key, field, val, exTime, callBack){
        if (exTime % 1 === 0 && exTime > 0) {
            cluster.hmset(key, field, val, function (err, result){
                callBack(err, result);
            });
            cluster.expire(key, exTime);
        } else if (exTime == 0) {
            cluster.hmset(key, field, val, function (err, result){
                callBack(err, result);
            });
        } else {
            cluster.hmset(key, field, val, function (err, result){
                callBack(err, result);
            });
        }
    }

    static getHMVal(key, field, callBack){
        cluster.hmget(key, field, function (err, result){
            callBack(err, result);
        });
    }

    static lpush(key, val, exTime){
        if (exTime % 1 === 0 && exTime > 0) {
            cluster.lpush(key, val);
            cluster.expire(key, exTime);
        } else if (exTime == 0) {
            cluster.lpush(key, val);
        }
    }

    static rpush(key, val, exTime){
        if (exTime % 1 === 0 && exTime > 0) {
            cluster.rpush(key, val);
            cluster.expire(key, exTime);
        } else if (exTime == 0) {
            cluster.rpush(key, val);
        }
    }

    static lpop(key, callBack){
        cluster.lpop(key, function (err, result){
            callBack(err, result);
        });
    }

    static ltrim(key, start, end, callback){
        cluster.ltrim(key, start, end, function (err, result){
            callback(err, result);
        });
    }

    static rpoplpush(from, to, callBack){
        cluster.rpoplpush(from, to, function (err, result){
            callBack(err, result);
        });
    }

    static del(key){
        cluster.del(key);
    }

    static llen(key, callBack){
        cluster.llen(key, function (err, result){
            callBack(err, result);
        });
    }

    static lrange(key, start, end, callBack){
        cluster.lrange(key, start, end, function (err, result){
            callBack(err, result);
        });
    }

    static exists(key, callBack){
        cluster.exists(key, function (err, result){
            callBack(err, result == 1);
        });
    }

}

module.exports = redisUtil; 
