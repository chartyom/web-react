/**
 * Module dependencies.
 */
var crypto = require('crypto');


module.exports = {

    /**
     * Return a unique identifier with the given `len`.
     *
     *     AuthHelpers.uniqueId(10);
     *     // => "FDaS435D2z"
     *
     * @param {Number} len
     * @return {String}
     */
    uniqueId: function (len) {
        var buf     = [],
            chars   = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
            charlen = chars.length;

        for (var i = 0; i < len; ++i) {
            buf.push(chars[getRandomInt(0, charlen - 1)]);
        }

        return buf.join('');
    },
    /**
     * Return a hash password.
     *
     *     AuthHelpers.encryptPassword(pass,salt);
     *     // => "FDaS435D2z"
     *
     * @param {String} password
     * @param {String} salt
     * @return {String}
     */
    encryptPassword: function (password, salt) {
        return crypto.createHmac('sha1', salt).update(password).digest('hex');
        //more secure - return crypto.pbkdf2Sync(password, this.salt, 10000, 512);
    },
    /**
     * Return result check password.
     *
     *     AuthHelpers.checkPassword(pass,hashPass);
     *     // => false
     *
     * @param {String} password
     * @param {String} salt
     * @param {String} hashPassword
     * @return {Bool}
     */
    checkPassword: function (password, salt, hashPassword) {
        return this.encryptPassword(password, salt) === hashPassword;
    },
    /**
     * Return salt.
     *
     *     AuthHelpers.getSalt();
     *     // => ???
     *
     * @return {String}
     */
    getSalt: function () {
        return crypto.randomBytes(32).toString('base64');
        //more secure - return crypto.randomBytes(128).toString('base64');
    }
};

/**
 * Retrun a random int, used by `AuthHelpers.uniqueId()`
 *
 * @param {Number} min
 * @param {Number} max
 * @return {Number}
 * @api private
 */

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
