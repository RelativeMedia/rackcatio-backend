/**
 * Created by mhdevita on 12/17/2016.
 */
"use strict";

const should = require('chai').should();
const faker = require('faker');

let currentUser = {};
before((done) => {
  axios
    .post('/auth/login', {
      identity: 'admin',
      password: '12345'
    })
    .then((res) => {
      currentUser = res.data.data;
      axios.defaults.headers = {
        'Authorization': 'Bearer ' + currentUser.token
      }
      done();
    })
    .catch((err) => {
      sails.log.error(err);
      return done(err);
    });
});

describe('controllers:UserController', () => {
  let currentUser = {};
  beforeEach((done) => {
    User
      .create({
        username: faker.name.firstName(),
        email: faker.internet.email(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        password: '12345'
      })
      .then((user) => {
        currentUser = user;
        done();
      })
      .catch((err) => {
        sails.log.error(err);
        return done(err);
      });
  });

  it('should list all users', (done) => {
    axios
      .get('/user')
      .then((res) => {
        res.status.should.eql(200);
        res.data.should.include.keys('code', 'message', 'data');
        res.data.code.should.eql('OK');
        res.data.message.should.eql('Operation is successfully executed');
        res.data.data.should.be.an('array');
        done();
      })
      .catch((err) => {
        sails.log.error(err.response);
        return done(err);
      });
  });

  it('should list a single user', (done) => {
    axios
      .get('/user/' + currentUser.id)
      .then((res) => {
        res.status.should.eql(200);
        res.data.should.include.keys('code', 'message', 'data');
        res.data.code.should.eql('OK');
        res.data.message.should.eql('Operation is successfully executed');
        res.data.data.should.be.an('object');
        done();
      })
      .catch((err) => {
        sails.log.error(err.response);
        return done(err);
      });
  });

  it('should create a new user', (done) => {
    const newUser = {
      username: faker.name.firstName(),
      email: faker.internet.email(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      password: '12345'
    };
    axios
      .post('/user', newUser)
      .then((res) => {
        res.status.should.eql(201);
        res.data.should.include.keys('code', 'message', 'data');
        res.data.code.should.eql('CREATED');
        res.data.message.should.eql('The request has been fulfilled and resulted in a new resource being created');
        res.data.data.should.be.an('object');
        done();
      })
      .catch((err) => {
        sails.log.error(err.response);
        return done(err);
      });
  });

  it('should update an existing user', (done) => {
    const updatedUser = {
      email: faker.internet.email()
    };

    axios
      .put('/user/' + currentUser.id, updatedUser)
      .then((res) => {
        res.status.should.eql(200);
        res.data.should.include.keys('code', 'message', 'data');
        res.data.code.should.eql('OK');
        res.data.message.should.eql('Operation is successfully executed');
        res.data.data.should.be.an('object');
        res.data.data.email.should.eql(updatedUser.email);
        done();
      })
      .catch((err) => {
        sails.log.error(err.response);
        return done(err);
      });
  });

  it('should delete a user', (done) => {
    axios
      .delete('/user/' + currentUser.id)
      .then((res) => {
        res.status.should.eql(200);
        res.data.should.include.keys('code', 'message', 'data');
        res.data.code.should.eql('OK');
        res.data.message.should.eql('Operation is successfully executed');
        res.data.data.should.be.an('object');
        done();
      })
      .catch((err) => {
        sails.log.error(err.response);
        return done(err);
      });
  });
});
