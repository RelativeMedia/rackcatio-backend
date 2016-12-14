/**
 * Created by mhdevita on 12/14/16.
 */
"use strict";
const _ = require('lodash');
const async = require('async');

/**
 * ProductKey
 * @description :: Model for storing ProductKeys
 */

function _encrypt (input) {
  var cipher  = HashService.crypto.createCipher(sails.config.services.hash.crypto.algorithm, sails.config.services.hash.crypto.password);
  var crypted = cipher.update(input,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}

function _decrypt (input) {
  var decipher = HashService.crypto.createDecipher(sails.config.services.hash.crypto.algorithm, sails.config.services.hash.crypto.password)
  var dec = decipher.update(input,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}

const encryptedFields = ['productkey'];
module.exports = {
  schema: true,
  autoUpdatedBy: true,
  autoCreatedBy: true,
  attributes: {
    name: {
      type: 'string',
      required: true,
      unique: true,
    },
    productkey: {
      type: 'string',
      required: true
    },

    // associations
    comments: {
      collection: 'Comment',
      via: 'productkey'
    },

    createdBy: {
      model: 'User'
    },
    updatedBy: {
      model: 'User'
    },

    toJSON() {
      let obj = this.toObject();
      return obj;
      // async.each(Object.keys(obj), function (key, cb) {
      //   obj[key] = (_.includes(encryptedFields, key)) ? _decrypt(obj[key]) : obj[key];
      //   setTimeout(function () {
      //     console.log(obj);
      //     cb();
      //   }, 3000);
      // }, function () {
      //   return obj;
      // });
    }
  },
  beforeCreate: function (values, next) {
    async.each(Object.keys(values), function (key, cb) {
      values[key] = (_.includes(encryptedFields, key)) ? _encrypt(values[key]) : values[key];
      cb();
    }, function () {
      next();
    });
  },
 beforeUpdate: function (values, next) {
   async.each(Object.keys(values), function (key, cb) {
     values[key] = (_.includes(encryptedFields, key)) ? _encrypt(values[key]) : values[key];
     cb();
   }, function () {
     next();
   });
 }
}
