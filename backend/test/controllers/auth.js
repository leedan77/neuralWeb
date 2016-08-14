import { expect } from 'chai';
import { generateToken, verifyToken } from '../../src/controllers/auth';
import { start, stop } from '../../src/server';
import { port } from '../../src/core/config';
import { createNewFBUser } from '../../src/controllers/user';
import { getFBUser } from '../../src/controllers/auth';
import FBUser from '../../src/models/FBUser';

describe('Auth controller', () => {
  describe('#generateToken', () => {
    it('generate token', () => {
      return generateToken({
        _id: 123,
        username: 'abc',
      }).then((token) => {
        expect(token).to.be.a('string');
      });
    });
  });

  describe('#verifyToken', () => {
    it('verify valid token', () => {
      return generateToken({
        _id: 123,
        username: 'abc',
      }).then((token) => {
        return verifyToken(token);
      }).then((user) => {
        expect(user).to.have.property('id').that.equals(123);
        expect(user).to.have.property('username').that.equals('abc');
      });
    });
    it('verify invalid token', () => {
      return verifyToken('123').catch((err) => {
        expect(err.message).to.exist;
      });
    });
  });

  describe('#getFBUser', () => {

    before(() => {
      return start().then(() => {
        return FBUser.remove({})
          .then(() => (
            createNewFBUser('valid@email.com', 'validtoken')
          ));
      });
    });
  
    after(() => {
      return FBUser.remove({})
        .then(() => (
          stop()
        ));
    });

    it('should get fb user', () => {
      return getFBUser('valid@email.com', 'validtoken')
        .then(user => {
          console.log(user);
          expect(user).to.have.property('email').that.equals('valid@email.com');
          expect(user).to.have.property('token').that.equals('validtoken');
        });
    });

  });

});

