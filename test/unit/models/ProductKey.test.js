/**
 * Created by mhdevita on 12/17/2016.
 */
"use strict";
const should = require('chai').should();
describe('models:ProductKey', () => {
  it('should have a single productkey in the db', (done) => {
    ProductKey
      .find()
      .then((productkeys) => {
        productkeys.length.should.be.at.least(1);
        productkeys[0].should.include.keys('name', 'productkey', 'createdBy', 'createdAt', 'updatedBy');
      })
      .then(done)
      .catch(done);
  });

  it('should create a new productkey', (done) => {
    const newProductKey = {
      name: 'Test ProductKey 2',
      productkey: 'foobar',
      createdBy: 1,
      updatedBy: 1
    };
    ProductKey
      .create(newProductKey)
      .then((productkey) => {
        productkey.should.include.keys('comments' , 'id', 'name', 'productkey', 'createdBy', 'updatedBy');
      })
      .then(done)
      .catch(done);
  });

  it('should delete a productkey', (done) => {
    const newProductKey = {
      name: 'Test ProductKey 3',
      productkey: 'foobar',
      createdBy: 1,
      updatedBy: 1
    };

    ProductKey
      .create(newProductKey)
      .then((productkey) => {
        ProductKey
          .destroy(productkey.id)
          .then((deletedProductKey) => {
            deletedProductKey[0].id.should.equal(productkey.id);
          })
          .then(done)
          .catch(done)
      })
      .catch(done);
  });

  it('should fail to create a new productkey with INVALID data', (done) => {
    const newProductKey = {
      name: undefined,
      productkey: undefined,
      createdBy: 1,
      updatedBy: 1
    };

    ProductKey
      .create(newProductKey)
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

