var crypto = require('crypto');
var clearEncoding = 'utf8';
var cipherEncoding = 'base64';
class CryptoUtils {

    static AESEncode(str, key){
        console.log('Original cleartext: ' + str);
        let algorithm = 'aes-128-ecb';
        let iv = ""
        let cipherChunks = [];
        let cipher = crypto.createCipheriv(algorithm, key, iv);
        cipherChunks.push(cipher.update(str, clearEncoding, cipherEncoding));
        cipherChunks.push(cipher.final(cipherEncoding));
        let result = cipherChunks.join('');
        console.log(cipherEncoding + ' ciphertext: ' + result);
        return result;
    }

    static AESDecode(str){
        let decipher = crypto.createDecipheriv(algorithm, key, iv);
        let plainChunks = [];
        for (let i = 0; i < cipherChunks.length; i++) {
            plainChunks.push(decipher.update(cipherChunks[i], cipherEncoding, clearEncoding));
        }
        plainChunks.push(decipher.final(clearEncoding));
        console.log("UTF8 plaintext deciphered: " + plainChunks.join(''));
    }

}

module.exports = CryptoUtils;
