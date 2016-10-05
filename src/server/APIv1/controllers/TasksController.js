var UsersModel = require('../models').UsersModel,
    Response   = require('../utils/ResponseJSON');

module.exports = {
    // method: GET
    // url: users
    // params:
    // query:
    find: function (req, res, next) {
        UsersModel.find({}, {page: req.query.page, limit: req.query.limit}, function (error, data) {
            if (error) return Response.error(res, 500, error);
            Response.success(res, 200, data);
        });
    },
    // method: GET
    // url: users/id:userId
    // params: userId
    // query:
    findById: function (req, res, next) {
        UsersModel.findOne({taskId: req.params.userId}, function (error, data) {
            if (error) return Response.error(res, 500, error);
            Response.success(res, 200, data);
        });
    },
    // method: GET
    // url: users/create
    // params:
    // query: title, content
    create: function (req, res, next) {
        if (req.query.title && req.query.content) {
            UsersModel.create({title: req.query.title, content: req.query.content}, function (error, data) {
                if (error) return Response.error(res, 500, error);
                Response.success(res, 200, data);
            });
        } else {
            Response.warning(res, 200, {
                title: req.query.title || 0,
                content: req.query.content || 0
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
                Response.success(res, 200, data);
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
                Response.success(res, 200, data);
            });
        } else {
            Response.warning(res, 200, {
                userId: req.params.userId || 0
            });
        }
    }
};

