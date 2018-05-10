import { profile } from '../models';

class ProfileController {
	getProfile(req, res) {
		profile.findById(req.params.id).then((prf) => {
			if (prf) {
				res.status(200).send(prf);
			} else {
				res.status(404).send('Profile not found');
			}
		});
	}

	postProfile(req, res) {
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

	putProfile(req, res) {
		profile.update(
			{
				businessName: req.body.businessName,
				contact: req.body.contact,
				email: req.body.email,
				mission: req.body.mission,
				banner: req.body.banner,
				userId: req.user.id,
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
