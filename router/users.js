/**
 * Created by yh on 2016/6/21.
 */
var usersController = require('../controller/users');

module.exports = function (app) {
    app.get('/users', usersController.getUsers);
    app.get('/user/:id', usersController.getUserById);
    app.get('/update', usersController.updateUser);
    app.get('/delete/:name', usersController.deleteByName);
    app.post('/add', usersController.addUser);
};