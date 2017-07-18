class StringUtils {

    static minLen(str, minLen) {
        return (str && Buffer.byteLength(str, 'utf8') > minLen);
    }

    static isNotEmpty(str) {
        return this.minLen(str, 0);
    }

}


module.exports = StringUtils;
