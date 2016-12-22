/**
 * Created by mhdevita on 12/17/2016.
 */
"use strict";
const should = require('chai').should();
describe('models:Item', () => {
  it('should have a single item in the db', (done) => {
    Item
      .find()
      .then((items) => {
        items.length.should.eql(fixtures.item.length);
        items[0].should.include.keys('name', 'createdBy', 'createdAt', 'updatedBy');
      })
      .then(done)
      .catch(done);
  });

  it('should create a new item', (done) => {
    const newItem = {
      name: 'Test Item 2',
      createdBy: 1,
      updatedBy: 1
    };
    Item
      .create(newItem)
      .then((item) => {
        item.should.include.keys('comments' , 'id', 'name', 'createdBy', 'updatedBy');
      })
      .then(done)
      .catch(done);
  });

  it('should delete a item', (done) => {
    const newItem = {
      name: 'Test Item 3',
      item: 1,
      createdBy: 1,
      updatedBy: 1
    };

    Item
      .create(newItem)
      .then((item) => {
        Item
          .destroy(item.id)
          .then((deletedItem) => {
            deletedItem[0].id.should.equal(item.id);
          })
          .then(done)
          .catch(done)
      })
      .catch(done);
  });

  it('should fail to create a new item with INVALID data', (done) => {
    const newItem = {
      name: undefined,
      createdBy: 1,
      updatedBy: 1
    };

    Item
      .create(newItem)
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

