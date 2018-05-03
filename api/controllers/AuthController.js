import { user } from '../models';

const ControllerUtil = require('./ControllerUtil');

const passwordHash = require('password-hash');

class AuthController extends ControllerUtil {
	constructor() {
		super();
	}

	signUp(req, res) {
		const newUser = user.build({
			email: req.body.email,
			fullName: req.body.fullName,
			passwordHash: passwordHash.generate(req.body.password),
		});

		newUser.save().then(() => {
			res.status(200).send('User successfully created.');
		}).catch((error) => {
			res.status(400).send(super.getErrorMessage(error));
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

