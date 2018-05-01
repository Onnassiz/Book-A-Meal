/* eslint class-methods-use-this: ["off"] */
/* eslint object-curly-newline: ["off"] */

const UsersServices = require('../modelServices/UsersServices');

class UsersController {
  getUsers(req, res) {
    const users = UsersServices.getUsers();
    res.send(users);
  }

  putUser(req, res) {
    const id = parseInt(req.params.id, 10);
    const existingUser = UsersServices.getSingleUser(id);

    if (!existingUser) {
      res.status(404).send('User not found');
    } else {
      const { username, password, name } = req.body;
      UsersServices.updateUser(id, username, password, name);
      res.status(200).send('user successfully updated');
    }
  }

  getSingleUser(req, res) {
    const id = parseInt(req.params.id, 10);
    const user = UsersServices.getSingleUser(id);

    if (!user) {
      res.status(404).send('user not found');
    } else {
      res.status(200).send(user);
    }
  }

  postUser(req, res) {
    const { id, username, password, name } = req.body;

    UsersServices.addUser(id, username, password, name);
    res.status(200).send('user successfully added');
  }

  changeRole(req, res) {
    const id = parseInt(req.params.id, 10);
    const user = UsersServices.getSingleUser(id);
    if (!user) {
      res.status(404).send('User not found');
    } else {
      const { role } = req.body;
      UsersServices.changeUserRole(id, role);
      res.status(200).send('user role successfully changed');
    }
  }

  deleteUser(req, res) {
    const id = parseInt(req.params.id, 10);
    if (UsersServices.deleteUser(id)) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  }

  blockUser(req, res) {
    const id = parseInt(req.params.id, 10);
    if (UsersServices.blockUser(id)) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  }
}

module.exports = new UsersController();

