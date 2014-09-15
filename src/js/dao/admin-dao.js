define(function() {
    'use strict';

    var AdminDAO = function(restDao) {
        this._restDao = restDao;
    };

    /**
     * Create a new email account.
     * @param  {String}   options.emailAddress  The desired email address
     * @param  {String}   options.password      The password to be used for the account.
     * @param  {String}   options.phone         The user's mobile phone number (required for verification and password reset).
     * @param  {Function} callback(error)
     */
    AdminDAO.prototype.createUser = function(options, callback) {
        var uri;

        if (!options.emailAddress || !options.password /* || !options.phone*/ ) {
            callback(new Error('Incomplete arguments!'));
            return;
        }

        uri = '/user';
        this._restDao.post(options, uri, function(err) {
            if (err && err.code === 409) {
                callback(new Error('User name is already taken!'));
                return;
            } else if (err) {
                callback(new Error('Error creating new user!'));
                return;
            }

            callback();
        });
    };

    return AdminDAO;
});