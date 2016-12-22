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

describe('controllers:ItemController', () => {
  let currentItem = {};
  beforeEach((done) => {
    Item
      .create({
        name: faker.name.firstName()
      })
      .then((item) => {
        currentItem = item;
        done();
      })
      .catch((err) => {
        sails.log.error(err);
        return done(err);
      });
  });

  it('should list all items', (done) => {
    axios
      .get('/item')
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

  it('should list a single item', (done) => {
    axios
      .get('/item/' + currentItem.id)
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

  it('should create a new item', (done) => {
    const newItem = {
      name: faker.name.firstName()
    };
    axios
      .post('/item', newItem)
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

  it('should update an existing item', (done) => {
    const updatedItem = {
      name: faker.name.firstName()
    };

    axios
      .put('/item/' + currentItem.id, updatedItem)
      .then((res) => {
        res.status.should.eql(200);
        res.data.should.include.keys('code', 'message', 'data');
        res.data.code.should.eql('OK');
        res.data.message.should.eql('Operation is successfully executed');
        res.data.data.should.be.an('object');
        res.data.data.name.should.eql(updatedItem.name);
        done();
      })
      .catch((err) => {
        sails.log.error(err.response.data.data);
        return done(err);
      });
  });

  it('should delete a item', (done) => {
    axios
      .delete('/item/' + currentItem.id)
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
