import { user } from '../api/models';
import { signJsonWebToken } from '../api/controllers/Util';

const getCustomerId = (done, callDone = true) => {
  return user.findOne({ where: { email: 'customer@bookmeal.com' } }).then((data) => {
    if (callDone) {
      done();
    }
    return data.id;
  });
};

const deleteUser = (email, done) => {
  user.destroy({
    where: { email },
  }).then(() => {
    done();
  });
};

const getCatererId = (done, callDone = true) => {
  return user.findOne({ where: { email: 'caterer@bookmeal.com' } }).then((data) => {
    if (callDone) {
      done();
    }
    return data.id;
  });
};

const getCustomerToken = (done, callDone = true) => {
  return user.findOne({ where: { email: 'customer@bookmeal.com' } }).then((data) => {
    if (callDone) {
      done();
    }
    return signJsonWebToken(data);
  });
};

const getCatererToken = (done) => {
  return user.findOne({ where: { email: 'caterer@bookmeal.com' } }).then((data) => {
    done();
    return signJsonWebToken(data);
  });
};

export {
  getCatererToken,
  getCustomerToken,
  getCustomerId,
  getCatererId,
  deleteUser,
};
