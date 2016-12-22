"use strict";

const should = require('chai').should();

const newUser = {
  username: 'modelTest',
  password: 'password',
  email: 'modelTest@gmail.com'
};

describe('models:User', () => {
  it('Should create new user', done => {
    User
      .create(newUser)
      .then(user => {
        user.username.should.equal(newUser.username);
        done();
      })
      .catch(done);
  });

  it('Should remove user', done => {
    User
      .destroy({username: newUser.username})
      .then((users) => {
        users[0].username.should.equal(newUser.username);
        done();
      })
      .catch(done);
  });
});
