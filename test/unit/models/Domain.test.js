/**
 * Created by mhdevita on 12/17/2016.
 */
"use strict";
const should = require('chai').should();
describe('models:Domain', () => {
  it('should have a single domain in the db', (done) => {
    Domain
      .find()
      .then((domains) => {
        domains.length.should.eql(fixtures.domain.length);
        domains[0].should.include.keys('domain', 'createdBy', 'createdAt', 'updatedBy');
      })
      .then(done)
      .catch(done);
  });

  it('should create a new domain', (done) => {
    const newDomain = {
      name: 'Test Domain 2',
      domain: 'test123.com',
      item: 1,
      createdBy: 1,
      updatedBy: 1
    };
    Domain
      .create(newDomain)
      .then((domain) => {
        domain.should.include.keys('domain', 'comments' , 'id', 'name', 'createdBy', 'updatedBy');
      })
      .then(done)
      .catch(done);
  });

  it('should delete a domain', (done) => {
    const newDomain = {
      name: 'Test Domain 3',
      domain: 'test123.com',
      item: 1,
      createdBy: 1,
      updatedBy: 1
    };

    Domain
      .create(newDomain)
      .then((domain) => {
        Domain
          .destroy(domain.id)
          .then((deletedDomain) => {
            deletedDomain[0].id.should.equal(domain.id);
          })
          .then(done)
          .catch(done)
      })
      .catch(done);
  });

  it('should fail to create a new domain with INVALID data', (done) => {
    const newDomain = {
      name: 'test',
      domain: undefined,
      createdBy: 1,
      updatedBy: 1
    };

    Domain
      .create(newDomain)
      .then(done)
      .catch((err) => {
        err.invalidAttributes.should.be.an('object');
        err.invalidAttributes.domain.should.be.an('array');
        err.invalidAttributes.domain[0].should.contain.keys('rule', 'message');
        err.invalidAttributes.domain[0].rule.should.equal('string');
        err.invalidAttributes.domain[1].should.contain.keys('rule', 'message');
        err.invalidAttributes.domain[1].rule.should.equal('required');
        done();
      });
  });
});

