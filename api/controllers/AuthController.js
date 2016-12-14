"use strict";

/**
 * AuthController
 * @description :: Server-side logic for manage users' authorization
 */

const _ = require('lodash');
const passport = require('passport');

module.exports = {
  /**
   * Sign in by email\password
   * @param req
   * @param res
   */
  login: function (req, res) {
    passport.authenticate('local', _.partial(sails.config.passport.onPassportAuth, req, res))(req, res);
  },

  /**
   * Sign up by email\password
   * @param req
   * @param res
   */
  register: function (req, res) {
    const values = _.omit(req.allParams(), 'id');

    User
      .create(values)
      .then(user => {
        return {token: CipherService.jwt.encodeSync({id: user.id}), user: user}
      })
      .then(res.created)
      .catch(res.negotiate);
  },

  /**
   * Accept JSON Web Token and updates with new one
   * @param req
   * @param res
   */
  refresh_token: function (req, res) {
    if (!req.param('token')) return res.badRequest(null, {message: 'You must provide token parameter'});

    const oldDecoded = CipherService.jwt.decodeSync(req.param('token'));

    res.ok({
      token: CipherService.jwt.encodeSync({id: oldDecoded.id})
    });
  }
};
