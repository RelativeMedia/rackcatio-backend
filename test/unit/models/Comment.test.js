/**
 * Created by mhdevita on 12/17/2016.
 */
"use strict";
const should = require('chai').should();
describe('models:Comment', () => {
  it('should have at least one comment in the db', (done) => {
    Comment
      .find()
      .then((comments) => {
        comments.length.should.be.at.least(1);
        comments[0].should.include.keys('comment', 'createdBy', 'createdAt', 'updatedBy');
      })
      .then(done)
      .catch(done);
  });

  it('should create a new comment', (done) => {
    const newComment = {
      comment: 'Test Comment',
      item: 1,
      createdBy: 1,
      updatedBy: 1
    };
    Comment
      .create(newComment)
      .then((comment) => {
        comment.should.include.keys('comment', 'item' , 'createdBy', 'updatedBy');
      })
      .then(done)
      .catch(done);
  });

  it('should delete a comment', (done) => {
    const newComment = {
      comment: 'Test Comment',
      item: 1,
      createdBy: 1,
      updatedBy: 1
    };

    Comment
      .create(newComment)
      .then((comment) => {
        Comment
          .destroy(comment.id)
          .then((deletedComment) => {
            deletedComment[0].id.should.equal(comment.id);
          })
          .then(done)
          .catch(done)
      })
      .catch(done);
  });

  it('should fail to create a new comment with INVALID data', (done) => {
    const newComment = {
      comment: undefined,
      createdBy: 1,
      updatedBy: 1
    };

    Comment
      .create(newComment)
      .then(done)
      .catch((err) => {
        err.invalidAttributes.should.be.an('object');
        err.invalidAttributes.comment.should.be.an('array');
        err.invalidAttributes.comment[0].should.contain.keys('rule', 'message');
        err.invalidAttributes.comment[0].rule.should.equal('string');
        err.invalidAttributes.comment[1].should.contain.keys('rule', 'message');
        err.invalidAttributes.comment[1].rule.should.equal('required');
        done();
      });
  });
});

