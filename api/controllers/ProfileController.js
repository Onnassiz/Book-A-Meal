import { profile } from '../models';

class ProfileController {
	getProfile(req, res) {
		profile.findById(req.params.id).then((prf) => {
			res.status(200).send(prf);
		});
	}

	postProfile(req, res) {
		const newProfile = profile.build({
			businessName: req.body.businessName,
			contact: req.body.contact,
			email: req.body.email,
			mission: req.body.mission,
			banner: req.body.banner,
			userId: req.body.userId,
		});


		newProfile.save().then((prf) => {
			res.status(200).send(prf);
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
				userId: req.body.userId,
			},
			{ where: { id: req.params.id }, returning: true },
		).then((updated) => {
			res.status(200).send(updated[1][0]);
		});
	}
}

export default new ProfileController();
