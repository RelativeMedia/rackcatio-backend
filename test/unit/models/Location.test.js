/**
 * Created by mhdevita on 12/17/2016.
 */
"use strict";
const should = require('chai').should();
describe('models:Location', () => {
  it('should have a single location in the db', (done) => {
    Location
      .find()
      .then((locations) => {
        locations.length.should.be.at.least(1);
        locations[0].should.include.keys('name', 'createdBy', 'createdAt', 'updatedBy');
      })
      .then(done)
      .catch(done);
  });

  it('should create a new location', (done) => {
    const newLocation = {
      name: 'Test Location 2',
      createdBy: 1,
      updatedBy: 1
    };
    Location
      .create(newLocation)
      .then((location) => {
        location.should.include.keys('comments' , 'id', 'name', 'createdBy', 'updatedBy');
      })
      .then(done)
      .catch(done);
  });

  it('should delete a location', (done) => {
    const newLocation = {
      name: 'Test Location 3',
      location: 1,
      createdBy: 1,
      updatedBy: 1
    };

    Location
      .create(newLocation)
      .then((location) => {
        Location
          .destroy(location.id)
          .then((deletedLocation) => {
            deletedLocation[0].id.should.equal(location.id);
          })
          .then(done)
          .catch(done)
      })
      .catch(done);
  });

  it('should fail to create a new location with INVALID data', (done) => {
    const newLocation = {
      name: undefined,
      createdBy: 1,
      updatedBy: 1
    };

    Location
      .create(newLocation)
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

