const { expect } = require('chai');
const { describe, it } = require('mocha');
const users = require('../api/mockups/users');

const UsersServices = require('../api/modelServices/UsersServices');

describe('Users', () => {
  describe('Constructor', () => {
    it('user should be array', () => {
      expect(Array.isArray(UsersServices.users)).to.equal(true);
    });
  });

  describe('GetUsers', () => {
    it('should return array of users', () => {
      expect(UsersServices.getUsers()).to.equal(users);
    });
  });

  describe('Get single user', () => {
    it('should return user based on id', () => {
      expect(UsersServices.getSingleUser(1)).to.equal(users[0]);
    });
  });

  describe('Add to users', () => {
    it('should add new user to users', () => {
      const userLength = UsersServices.getUsers().length;
      UsersServices.addUser(4, 'bestman@gmail.com', 'password', 'Onah Ben');
      expect(UsersServices.getUsers().length).to.equal(userLength + 1);
    });
  });

  describe('Update users', () => {
    it('should update one user data', () => {
      expect(UsersServices.updateUser(2, 'bestman@gmail.com', 'password', 'Onah Ben')).to.equal(true);
    });

    it('should return false for wrong index', () => {
      expect(UsersServices.updateUser(10, 'bestman@gmail.com', 'password', 'Onah Ben')).to.equal(false);
    });
  });

  describe('Delete users', () => {
    it('should remove user from users', () => {
      const userLength = UsersServices.getUsers().length;
      UsersServices.deleteUser(1);
      expect(UsersServices.getUsers().length).to.equal(userLength - 1);
    });
  });

  describe('Delete no users', () => {
    it('should return false when called with a wrong index', () => {
      expect(UsersServices.deleteUser(5)).to.equal(false);
    });
  });

  describe('Block user', () => {
    it('should set user active to false', () => {
      UsersServices.blockUser(2);
      expect(UsersServices.getSingleUser(2).active).to.equal(false);
    });

    it('should return false for wrong index', () => {
      expect(UsersServices.blockUser(5)).to.equal(false);
    });

    it('should return true for right index', () => {
      expect(UsersServices.blockUser(2)).to.equal(true);
    });
  });

  describe('Change user role', () => {
    it('should set user role to value', () => {
      UsersServices.changeUserRole(2, 'tester');
      expect(UsersServices.getSingleUser(2).role).to.equal('tester');
    });

    it('should return false for wrong index', () => {
      expect(UsersServices.changeUserRole(5)).to.equal(false);
    });

    it('should return true for right index', () => {
      expect(UsersServices.changeUserRole(2)).to.equal(true);
    });
  });
});
