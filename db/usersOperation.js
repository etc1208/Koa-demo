/**
 * Created by yh on 2016/6/21.
 */
var wrapper = require('co-mysql');
var mysql = require('mysql');
var parse = require('co-body'); //接收post请求参数

var dbConfig = require('./dbConfig');

var pool = mysql.createPool(dbConfig);
var p = wrapper(pool);

module.exports = {
  
    getUsers: function *() {
        var rows = yield p.query('SELECT * FROM userinfo');
        if(rows.length === 0) {
            var result = {
                success: false,
                message: 'no users'
            };
        } else {
            var result = {
                success: true,
                users: rows
            };
        }
        this.body = result;
    },

    getUserById: function *() {
        //console.log(this.params.id);
        var userId = this.params.id;
        var rows = yield p.query('SELECT * FROM userinfo WHERE id=?', userId);
        //console.log(rows);
        if(rows.length === 0) {
            var result = {
                success: false,
                message: 'no user has id:' + userId
            };
        } else {
            var result = {
                success: true,
                user: rows
            };
        }
        this.body = result;
    },

    updateUser: function *() {
        var name = this.query.name;
        var profession = this.query.profession;
        var password = this.query.password;
        //console.log(name+"--"+password+"--"+profession);
        if(!name || !profession || !password) {
            var result = {
                success: false,
                message: 'lack param'
            };
        } else {
            var rows = yield p.query(
                'UPDATE userinfo SET PASSWORD=?, PROFESSION=? WHERE NAME=?',
                [password, profession, name]);
            //console.log(rows);
            if(rows.affectedRows > 0) {
                var result = {
                    success: true,
                    message: 'User:' + name + ' has updated'
                };
            } else {
                var result = {
                    success: false,
                    message: 'no user names ' + name
                };
            }
        }
        this.body = result;
    },

    deleteByName: function *() {
        var name = this.params.name;
        var rows = yield p.query('DELETE FROM userinfo WHERE NAME=?', name);
        //console.log(rows)
        if(rows.affectedRows > 0) {
            var result = {
                success: true,
                message: 'User:' + name + ' has been deleted'
            };
        } else {
            var result = {
                success: false,
                message: 'fail to delete anyone'
            };
        }
        this.body = result;
    },

    addUser: function *() {
        var post = yield parse(this.request);
        try {
            var postObj = JSON.parse(post);
            var name = postObj.name;
            var password = postObj.password;
            var profession = postObj.profession;

            if(!name || !password || !profession) {
                var result = {
                    success: false,
                    message: 'lack param'
                };
            } else {
                var rows = yield p.query(
                    'INSERT INTO userinfo(name,password,profession) VALUES(?,?,?)',
                    [name, password, profession]
                );
                if(rows.affectedRows > 0) {
                    var result = {
                        success: true,
                        message: 'user: ' + name + ' add success'
                    };
                } else {
                    var result = {
                        success: false,
                        message: 'add user fail'
                    };
                }
            }
            this.body = result;
        } catch (e) {
            this.body = "参数格式错误";
        }
    }
};