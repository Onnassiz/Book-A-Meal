/* eslint class-methods-use-this: ["off"] */
/* eslint object-curly-newline: ["off"] */

const UsersServices = require('../modelServices/UsersServices');

class UsersController {
  constructor(router) {
    this.router = router;
    this.registerRoutes();
  }

  registerRoutes() {
    this.router.get('/users', this.getUsers.bind(this));
    this.router.get('/users/:id', this.getSingleUser.bind(this));
    this.router.post('/users', this.postUser.bind(this));
    this.router.put('/users/:id', this.putUser.bind(this));
    this.router.put('/users/role/:id', this.changeRole.bind(this));
    this.router.delete('/users/:id', this.deleteUser.bind(this));
    this.router.put('/users/block/:id', this.blockUser.bind(this));
  }

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
      res.sendStatus(200);
    }
  }

  getSingleUser(req, res) {
    const id = parseInt(req.params.id, 10);
    const user = UsersServices.getSingleUser(id);

    if (!user) {
      res.sendStatus(404);
    } else {
      res.send(user);
    }
  }

  postUser(req, res) {
    const { id, username, password, name } = req.body;

    UsersServices.addUser(id, username, password, name);
    res.sendStatus(200);
  }

  changeRole(req, res) {
    const id = parseInt(req.params.id, 10);
    const user = UsersServices.getSingleUser(id);
    if (!user) {
      res.status(404).send('User not found');
    } else {
      const { role } = req.body;
      UsersServices.changeUserRole(id, role);
      res.sendStatus(200);
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

module.exports = UsersController;
