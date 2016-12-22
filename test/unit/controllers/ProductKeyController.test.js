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

describe('controllers:ProductKeyController', () => {
  let currentProductKey = {};
  beforeEach((done) => {
    ProductKey
      .create({
        name: faker.name.firstName(),
        productkey: 'foobar123'
      })
      .then((productkey) => {
        currentProductKey = productkey;
        done();
      })
      .catch((err) => {
        sails.log.error(err);
        return done(err);
      });
  });

  it('should list all productkeys', (done) => {
    axios
      .get('/productkey')
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

  it('should list a single productkey', (done) => {
    axios
      .get('/productkey/' + currentProductKey.id)
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

  it('should create a new productkey', (done) => {
    const newProductKey = {
      name: faker.name.firstName(),
      productkey: faker.name.firstName()
    };
    axios
      .post('/productkey', newProductKey)
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

  it('should update an existing productkey', (done) => {
    const updatedProductKey = {
      name: faker.name.firstName()
    };

    axios
      .put('/productkey/' + currentProductKey.id, updatedProductKey)
      .then((res) => {
        res.status.should.eql(200);
        res.data.should.include.keys('code', 'message', 'data');
        res.data.code.should.eql('OK');
        res.data.message.should.eql('Operation is successfully executed');
        res.data.data.should.be.an('object');
        res.data.data.name.should.eql(updatedProductKey.name);
        done();
      })
      .catch((err) => {
        sails.log.error(err.response);
        return done(err);
      });
  });

  it('should delete a productkey', (done) => {
    axios
      .delete('/productkey/' + currentProductKey.id)
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
