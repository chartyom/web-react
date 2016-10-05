var UsersModel  = require('../models').UsersModel,
    Response    = require('../utils/ResponseJSON'),
    AuthHelpers = require('../utils/AuthHelpers'),
    validator   = require('validator');

module.exports = {
    /*
     Отображение всех пользователей
     method: GET
     url: users
     params:
     query: page, limit
     body:
     */
    find: function (req, res, next) {
        UsersModel.find({}, {page: req.query.page, limit: req.query.limit, column: ["userId","email","firstName"]}, function (error, data) {
            if (error) return Response.error(res, 500, error);
            Response.success(res, data);
        });
    },
    // method: GET
    // url: users
    // params:
    // query:
    // body:
    profile: function (req, res, next) {
        req.user.page='Profile';
        Response.success(res, req.user);
    },
    // method: GET
    // url: users/id:userId
    // params: userId
    // query:
    // body:
    findById: function (req, res, next) {
        UsersModel.findOne({userId: req.params.userId}, {column: ["userId","firstName"]}, function (error, data) {
            if (error) return Response.error(res, 500, error);
            Response.success(res, data);
        });
    },
    // method: POST
    // url: users/registration
    // params:
    // query:
    // body: email, password, first_name
    create: function (req, res, next) {
        var email          = req.body.email || '',
            emailCheck     = validator.isEmail(email),
            password       = req.body.password || '',
            passwordCheck  = validator.isLength(password, {min: 6, max: 60}),
            firstName      = validator.whitelist(req.body.first_name, 'a-zA-Zа-яА-ЯёЁ') || '',
            firstNameCheck = validator.isLength(firstName, {min: 2, max: 60});

        /* secondName     = validator.whitelist(req.body.secondName, 'a-zA-Zа-яА-ЯёЁ') || '',
         middleName     = validator.whitelist(req.body.middleName, 'a-zA-Zа-яА-ЯёЁ') || '';*/

        if (emailCheck && passwordCheck && firstNameCheck) {
            email = validator.normalizeEmail(email);
            UsersModel.findOne({email: email}, {column: ["userId"]}, function (error, data) {
                if (error) return Response.error(res, 500, error);
                if (data) {
                    //Пользователь существует
                    Response.warning(res, 2, {user: 1});
                } else {
                    var passwordSalt = AuthHelpers.getSalt();
                    password = AuthHelpers.encryptPassword(password, passwordSalt);
                    UsersModel.create({
                        email: email,
                        firstName: firstName,
                        password: password,
                        passwordSalt: passwordSalt
                    }, function (error, data) {
                        if (error) Response.error(res, 500, error);
                        Response.success(res, data);
                    });
                }
            });

        } else {
            Response.warning(res, 1, {
                email: email,
                emailCheck: emailCheck,
                password: password,
                passwordCheck: passwordCheck,
                firstName: firstName,
                firstNameCheck: firstNameCheck
            });
        }
    },
    // method: GET
    // url: users/update/id:userId
    // params: userId
    // query: title, content
    updateById: function (req, res, next) {
        if (req.query.title && req.query.content && req.params.userId) {
            UsersModel.update({
                title: req.query.title,
                content: req.query.content
            }, {taskId: req.params.userId}, function (error, data) {
                if (error) return Response.error(res, 500, error);
                Response.success(res, data);
            });
        } else {
            Response.warning(res, 200, {
                title: req.query.title || 0,
                content: req.query.content || 0,
                userId: req.params.userId || 0
            });
        }
    },
    // method: GET
    // url: users/remove/id:userId
    // params: userId
    // query:
    removeById: function (req, res, next) {
        if (req.params.userId) {
            UsersModel.remove({taskId: req.params.userId}, function (error, data) {
                if (error) return Response.error(res, 500, error);
                Response.success(res, data);
            });
        } else {
            Response.warning(res, 200, {
                userId: req.params.userId || 0
            });
        }
    }
};

