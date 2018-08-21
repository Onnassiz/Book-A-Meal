import { profile } from '../../api/models';

import { getCatererId } from '../main';

const deleteProfile = (done) => {
  profile.destroy({
    where: {},
  }).then(() => {
    done();
  });
};

const insertProfile = done => getCatererId(done, false).then((id) => {
  const newProfile = profile.build({
    businessName: 'Your name',
    mission: 'Your mission',
    contact: 'Your this is your contact',
    banner: 'https://banner.com',
    email: 'benjamin@gmail.com',
    userId: id,
  });

  return newProfile.save().then(data => data);
});

export {
  deleteProfile,
  insertProfile,
};
