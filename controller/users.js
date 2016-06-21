/**
 * Created by yh on 2016/6/21.
 */

var usersOperation = require('../db/usersOperation');
module.exports = {
    getUsers: usersOperation.getUsers,
    getUserById: usersOperation.getUserById,
    updateUser: usersOperation.updateUser,
    deleteByName: usersOperation.deleteByName,
    addUser: usersOperation.addUser
};