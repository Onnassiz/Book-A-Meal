import { user } from '../models';

const passwordHash = require('password-hash');

function getErrorMessage(error) {
	const message = error.errors[0];
	return {
		[message.path]: message.message,
	};
}

class AuthController {
	signUp(req, res) {
		const newUser = user.build({
			email: req.body.email,
			fullName: req.body.fullName,
			passwordHash: passwordHash.generate(req.body.password),
		});

		newUser.save().then(() => {
			res.status(200).send('User successfully created.');
		}).catch((error) => {
			res.status(400).send(getErrorMessage(error));
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
					res.status(200).send('User signed in.');
				} else {
					res.status(404).send('User not found.');
				}
			}
		});
	}
}

module.exports = new AuthController();

