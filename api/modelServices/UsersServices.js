
const users = require('../mockups/users');


class UsersServices {
  constructor(_users) {
    this.users = _users;
  }

  getUsers() {
    return this.users;
  }

  getSingleUser(id) {
    return this.users.find(x => x.id === id);
  }

  addUser(id, username, password, name) {
    this.users.push({
      id,
      username,
      password,
      name,
      active: true,
      role: 'client',
    });

    return true;
  }

  updateUser(id, username, password, name) {
    const user = this.getSingleUser(id);
    if (user) {
      user.name = name;
      user.username = username;
      user.password = password;

      return true;
    }
    return false;
  }

  deleteUser(id) {
    const index = this.users.findIndex(x => x.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
      return true;
    }
    return false;
  }

  blockUser(id) {
    const user = this.getSingleUser(id);
    if (user) {
      user.active = false;
      return true;
    }
    return false;
  }

  changeUserRole(id, role) {
    const user = this.getSingleUser(id);
    if (user) {
      user.role = role;
      return true;
    }
    return false;
  }
}

module.exports = new UsersServices(users);

