import { user, profile } from '../api/models';
import { signJsonWebToken } from '../api/controllers/Util';

const getCustomerId = () => user.findOne({ where: { email: 'customer@bookmeal.com' } }).then(data => data.id);

const deleteUser = (email, done) => {
  user.destroy({
    where: { email },
  }).then(() => {
    done();
  });
};

const getCatererId = () => user.findOne({ where: { email: 'caterer@bookmeal.com' } }).then(data => data.id);

const getCustomerToken = (done, callDone = true) => user.findOne({ where: { email: 'customer@bookmeal.com' } }).then((data) => {
  if (callDone) {
    done();
  }
  return signJsonWebToken(data);
});

const getCatererToken = (done, callDone = true) => user.findOne({ where: { email: 'caterer@bookmeal.com' } }).then((data) => {
  if (callDone) {
    done();
  }
  return signJsonWebToken(data);
});

const getSecondCatererToken = done => user.findOne({ where: { email: 'caterer2@bookmeal.com' } }).then((data) => {
  done();
  return signJsonWebToken(data);
});

const createAdminProfile = (id) => {
  const data = profile.build({
    businessName: 'Your name',
    mission: 'Your mission',
    contact: 'Your this is your contact',
    email: 'benjamin@gmail.com',
    banner: 'https://youcan.com',
    userId: id,
  });

  return data.save().then(result => result);
};

export {
  getCatererToken,
  getCustomerToken,
  getCustomerId,
  getCatererId,
  deleteUser,
  createAdminProfile,
  getSecondCatererToken,
};
