import { user } from '../models';
import { signJsonWebToken, getErrorMessage } from './Util';

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
			res.status(201).send({
				id: usr.id,
				fullName: usr.fullName,
				email: usr.email,
				role: usr.role,
				message: 'User successfully created',
				token: signJsonWebToken(usr),
			});
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
				res.status(404).send({ message: 'User not found' });
			} else {
				const hashedPassword = usr.passwordHash;
				if (passwordHash.verify(req.body.password, hashedPassword)) {
					res.status(200).send({
						id: usr.id,
						fullName: usr.fullName,
						email: usr.email,
						role: usr.role,
						message: 'User successfully created',
						token: signJsonWebToken(usr),
					});
				} else {
					res.status(404).send({
						message: 'User not found.',
					});
				}
			}
		});
	}
}

export default new AuthController();

