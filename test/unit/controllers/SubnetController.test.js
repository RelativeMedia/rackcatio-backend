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

describe('controllers:SubnetController', () => {
  let currentSubnet = {};
  beforeEach((done) => {
    Subnet
      .create({
        name: faker.name.firstName(),
        start: '192.168.10.1',
        end: '192.168.10.254',
        mask: '255.255.255.0'
      })
      .then((subnet) => {
        currentSubnet = subnet;
        done();
      })
      .catch((err) => {
        sails.log.error(err);
        return done(err);
      });
  });

  it('should list all subnets', (done) => {
    axios
      .get('/subnet')
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

  it('should list a single subnet', (done) => {
    axios
      .get('/subnet/' + currentSubnet.id)
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

  it('should create a new subnet', (done) => {
    const newSubnet = {
      name: faker.name.firstName(),
      start: '192.168.10.1',
      end: '192.168.10.254',
      mask: '255.255.255.0'
    };
    axios
      .post('/subnet', newSubnet)
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

  it('should update an existing subnet', (done) => {
    const updatedSubnet = {
      name: faker.name.firstName()
    };

    axios
      .put('/subnet/' + currentSubnet.id, updatedSubnet)
      .then((res) => {
        res.status.should.eql(200);
        res.data.should.include.keys('code', 'message', 'data');
        res.data.code.should.eql('OK');
        res.data.message.should.eql('Operation is successfully executed');
        res.data.data.should.be.an('object');
        res.data.data.name.should.eql(updatedSubnet.name);
        done();
      })
      .catch((err) => {
        sails.log.error(err.response);
        return done(err);
      });
  });

  it('should delete a subnet', (done) => {
    axios
      .delete('/subnet/' + currentSubnet.id)
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
