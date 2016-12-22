/**
 * Created by mhdevita on 12/17/2016.
 */
"use strict";
const should = require('chai').should();
describe('models:Subnet', () => {
  it('should have a single subnet in the db', (done) => {
    Subnet
      .find()
      .then((subnets) => {
        subnets.length.should.be.at.least(1);
        subnets[0].should.include.keys('name', 'start', 'end', 'mask', 'createdBy', 'createdAt', 'updatedBy');
      })
      .then(done)
      .catch(done);
  });

  it('should create a new subnet', (done) => {
    const newSubnet = {
      name: 'Test Subnet 2',
      start: '192.168.10.1',
      end: '192.168.10.254',
      mask: '255.255.255.0',
      createdBy: 1,
      updatedBy: 1
    };
    Subnet
      .create(newSubnet)
      .then((subnet) => {
        subnet.should.include.keys('comments' , 'id', 'name', 'createdBy', 'updatedBy');
      })
      .then(done)
      .catch(done);
  });

  it('should delete a subnet', (done) => {
    const newSubnet = {
      name: 'Test Subnet 3',
      start: '192.168.10.1',
      end: '192.168.10.254',
      mask: '255.255.255.0',
      subnet: 1,
      createdBy: 1,
      updatedBy: 1
    };

    Subnet
      .create(newSubnet)
      .then((subnet) => {
        Subnet
          .destroy(subnet.id)
          .then((deletedSubnet) => {
            deletedSubnet[0].id.should.equal(subnet.id);
          })
          .then(done)
          .catch(done)
      })
      .catch(done);
  });

  it('should fail to create a new subnet with INVALID data', (done) => {
    const newSubnet = {
      name: undefined,
      createdBy: 1,
      updatedBy: 1
    };

    Subnet
      .create(newSubnet)
      .then(done)
      .catch((err) => {
        err.invalidAttributes.should.be.an('object');
        err.invalidAttributes.name.should.be.an('array');
        err.invalidAttributes.name[0].should.contain.keys('rule', 'message');
        err.invalidAttributes.name[0].rule.should.equal('string');
        err.invalidAttributes.name[1].should.contain.keys('rule', 'message');
        err.invalidAttributes.name[1].rule.should.equal('required');
        done();
      });
  });
});

