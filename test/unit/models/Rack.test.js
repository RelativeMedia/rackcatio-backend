/**
 * Created by mhdevita on 12/17/2016.
 */
"use strict";
const should = require('chai').should();
describe('models:Rack', () => {
  it('should have a single rack in the db', (done) => {
    Rack
      .find()
      .then((racks) => {
        racks.length.should.be.at.least(1);
        racks[0].should.include.keys('name', 'createdBy', 'createdAt', 'updatedBy');
      })
      .then(done)
      .catch(done);
  });

  it('should create a new rack', (done) => {
    const newRack = {
      name: 'Test Rack 2',
      createdBy: 1,
      updatedBy: 1
    };
    Rack
      .create(newRack)
      .then((rack) => {
        rack.should.include.keys('comments' , 'id', 'name', 'createdBy', 'updatedBy');
      })
      .then(done)
      .catch(done);
  });

  it('should delete a rack', (done) => {
    const newRack = {
      name: 'Test Rack 3',
      createdBy: 1,
      updatedBy: 1
    };

    Rack
      .create(newRack)
      .then((rack) => {
        Rack
          .destroy(rack.id)
          .then((deletedRack) => {
            deletedRack[0].id.should.equal(rack.id);
          })
          .then(done)
          .catch(done)
      })
      .catch(done);
  });

  it('should fail to create a new rack with INVALID data', (done) => {
    const newRack = {
      name: undefined,
      createdBy: 1,
      updatedBy: 1
    };

    Rack
      .create(newRack)
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

