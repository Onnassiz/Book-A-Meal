import { address } from '../models';

class AddressController {
	getUserAddresses(req, res) {
		address.findAll({ where: { userId: req.params.userId } }).then((addr) => {
			res.status(200).send(addr);
		}).catch((error) => {
			res.status(400).send(error);
		});
	}

	getAddress(req, res) {
		address.findById(req.params.id).then((addr) => {
			res.status(200).send(addr);
		});
	}

	postAddress(req, res) {
		const newAddress = address.build({
			streetAddress: req.body.streetAddress,
			city: req.body.city,
			state: req.body.state,
			userId: req.body.userId,
		});

		newAddress.save().then((addr) => {
			res.status(200).send(addr);
		}).catch((error) => {
			res.status(400).send(error);
		});
	}

	putAddress(req, res) {
		address.update(
			{
				streetAddress: req.body.streetAddress,
				city: req.body.city,
				state: req.body.state,
				userId: req.body.userId,
			},
			{ where: { id: req.params.id }, returning: true },
		).then((updated) => {
			res.status(200).send(updated[1][0]);
		}).catch((error) => {
			res.status(400).send(error);
		});
	}
}

export default new AddressController();
