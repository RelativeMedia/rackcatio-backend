"use strict";

const should = require('chai').should();
const faker = require('faker');


let newUser = {
  username: faker.name.firstName(),
  email: faker.internet.email(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  password: '12345'
};

let createdUser = {};

describe('controllers:AuthController', () => {

  beforeEach((done) => {
    User
      .create(newUser)
      .then((user) => {
        createdUser = user;
        done();
      })
      .catch((err) => {
        sails.log.error(err);
        return done(err);
      });
  });

  afterEach((done) => {
    User
      .destroy({ username: createdUser.username })
      .then((user) => {
        createdUser = {};
        done();
      })
      .catch((err) => {
        sails.log.error(err);
        return done(err);
      });
  });

  it('should login a user', (done) => {
      axios
        .post('/auth/login', {
          identity: createdUser.username,
          password: newUser.password
        })
        .then((res) => {
          res.status.should.eql(200);
          res.statusText.should.eql('OK');
          const body = res.data;

          body.should.include.keys('code', 'message', 'data');
          body.data.should.include.keys('token', 'user');
          body.data.user.should.include.keys('username', 'email', 'firstName', 'lastName', 'id', 'photo', 'createdAt', 'updatedAt');
          body.data.user.should.not.include.keys('password');
        })
        .then(done)
        .catch((err) => {
          sails.log.error(err);
          return done(err);
        });
  });

  it('should throw an http error code 401 with invalid credentials', (done) => {
    axios
      .post('/auth/login', {
        identity: createdUser.username,
        password: 'someinvalidpass'
      })
      .then(done)
      .catch((err) => {
        const res = err.response;
        res.status.should.eql(401);
        res.statusText.should.eql('Unauthorized');
        res.data.code.should.eql('E_USER_NOT_FOUND');
        res.data.message.should.eql('User with specified credentials is not found');
        return done();
      });

  });

  it('should register a user and return http code 201', (done) => {
    const newuser = {
      username: faker.name.firstName(),
      email: faker.internet.email(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      password: faker.internet.password()
    };

    axios
      .post('/auth/register', newuser)
      .then((res) => {
        res.status.should.eql(201);
        const user = res.data.data.user;
        const token = res.data.data.token;
        res.data.should.include.keys('code', 'message', 'data');
        res.data.message.should.eql('The request has been fulfilled and resulted in a new resource being created');
        res.data.code.should.eql('CREATED');
        res.data.data.should.include.keys('token', 'user');
        user.should.include.keys('username', 'firstName', 'lastName', 'email', 'id', 'photo', 'createdAt', 'updatedAt');

        done();
      })
      .catch((err) => {
        sails.log.error(err);
        return done();
      });
  });

  it('should provide a new token given a valid token', (done) => {
    axios
      .post('/auth/login', {
        identity: createdUser.username,
        password: newUser.password
      }).then((res) => {
        return res.data.data;
      })
      .then((user) => {
        axios
          .post('/auth/refresh_token?token=' + user.token)
          .then((res) => {
            res.status.should.eql(200);
            res.data.should.include.keys('code', 'message', 'data');
            res.data.code.should.eql('OK');
            res.data.message.should.eql('Operation is successfully executed');
            res.data.data.should.include.keys('token');

            done();
          })
          .catch((err) => {
            sails.log.error(err);
            return done(err);
          });
      });
  });

  it('should throw an http error 400 code with an invalid or missing token', (done) => {
    axios
      .post('/auth/refresh_token')
      .then((res) => {
        done();
      })
      .catch((err) => {
        const res = err.response;
        res.status.should.eql(400);
        res.data.should.include.keys('code', 'message', 'data');
        res.data.code.should.eql('E_BAD_REQUEST');
        res.data.message.should.eql('You must provide token parameter');
        done();
      });
  });
});
