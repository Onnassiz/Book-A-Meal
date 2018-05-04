import { user } from '../models';

const Util = require('./Util');
const passwordHash = require('password-hash');


class AuthController {
	signUp(req, res) {
		const newUser = user.build({
			email: req.body.email,
			fullName: req.body.fullName,
			role: req.body.role,
			passwordHash: passwordHash.generate(req.body.password),
		});

		newUser.save().then((usr) => {
			res.status(200).send(Util.signJsonWebToken(usr));
		}).catch((error) => {
			res.status(400).send(Util.getErrorMessage(error));
		});
	}

	signIn(req, res) {
		user.findOne({
			where: {
				email: req.body.email,
			},
		}).then((usr) => {
			if (usr === null) {
				res.status(404).send('User not found.');
			} else {
				const hashedPassword = usr.passwordHash;
				if (passwordHash.verify(req.body.password, hashedPassword)) {
					res.status(200).send(Util.signJsonWebToken(usr));
				} else {
					res.status(404).send('User not found.');
				}
			}
		});
	}
}

module.exports = new AuthController();

