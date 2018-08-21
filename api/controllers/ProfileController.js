import { profile } from '../models';

class ProfileController {
  getProfile(req, res) {
    profile.findOne({ where: { userId: req.user.id } }).then((prf) => {
      if (prf) {
        res.status(200).send(prf);
      } else {
        res.status(404).send('Profile not found');
      }
    });
  }

  verifyProfile(req, res, next) {
    profile.findOne({ where: { userId: req.user.id } }).then((prf) => {
      if (prf) {
        next();
      } else {
        res.status(400).send('You must setup a profile before performing this operation');
      }
    });
  }

  postProfile(req, res) {
    profile.findOne({ where: { userId: req.user.id } }).then((prof) => {
      if (prof) {
        res.status(400).send({ message: 'You have already created a profile.' });
      } else {
        const newProfile = profile.build({
          businessName: req.body.businessName,
          contact: req.body.contact,
          email: req.body.email,
          mission: req.body.mission,
          banner: req.body.banner,
          userId: req.user.id,
        });


        newProfile.save().then((prf) => {
          res.status(201).send(prf);
        });
      }
    });
  }

  putProfile(req, res) {
    const userId = req.user.id;
    profile.update(
      {
        businessName: req.body.businessName,
        contact: req.body.contact,
        email: req.body.email,
        mission: req.body.mission,
        banner: req.body.banner,
        userId,
      },
      { where: { id: req.params.id }, returning: true },
    ).then((updated) => {
      const prf = updated[1][0];
      if (prf) {
        res.status(200).send(prf);
      } else {
        res.status(404).send('Profile not found');
      }
    });
  }
}

export default new ProfileController();
