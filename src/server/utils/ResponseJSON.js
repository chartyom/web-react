var ResponseJSON;

/**
 * Response status code and ready json row

 EXAMPLES

 success - результат удачного выполнения
 {
     response: {
         DATA: DATA
     }
 }

 warning - Предупреждения, например о существующем пользователе с таким именем
 {
    response: {
        warning: 1,
        warningMessage: "User with the same name already exists"
    }
 }

 error - Ошибки
 {
    response: {
        error: 401,
        errorMessage: "Unauthorized"
    }
 }
 */

ResponseJSON = {
    success: function (res, data, callback) {
        // Если результат выполнения скрипта выдал data=undefined,
        // то следует ошибка 404 Not Found
        if (!data) {
            this.error(res, 404, null, callback)
        } else {
            layout(res, 200, data, callback);
        }
    },
    successStatusCode: function (res, statusCode, data, callback) {
        // Если результат выполнения скрипта выдал data=undefined,
        // то следует ошибка 404 Not Found
        if (!data) {
            this.error(res, 404, null, callback)
        } else {
            layout(res, statusCode, data, callback);
        }
    },
    warning: function (res, warningCode, data, callback) {
        var _data = {};
        _data.warning = warningCode || 1;
        _data.warningMessage = data || "";
        layout(res, 200, _data, callback);
    },
    warningStatusCode: function (res, warningCode, statusCode, data, callback) {
        var _data = {};
        _data.warning = warningCode || 1;
        _data.warningMessage = data || "";
        layout(res, statusCode, _data, callback);
    },
    error: function (res, statusCode, data, callback) {
        var _data = {};
        _data.error = statusCode;
        _data.errorMessage = errSelect(statusCode);
        /*Вывод возможных ошибок*/
        if (process.env.SERVER_MODE !== 'production' && data)
            _data.debug = data;
        layout(res, statusCode, _data, callback);
    }
};

function errSelect(statusCode) {
    switch (statusCode) {
        case 400:
            return 'Bad Request';
            break;
        case 401:
            return 'Unauthorized';
            break;
        case 403:
            return 'Forbidden';
            break;
        case 404:
            return 'Not found';
            break;
        case 500:
            return 'Internal Server Error';
            break;
        default:
            console.error('Need create description error code: ' + statusCode);
            return 'Error';
    }
}

function layout(res, statusCode, data, callback) {
    res.status(statusCode).json({
        response: data
    });
    if (callback) {
        callback();
    }
}

module.exports = ResponseJSON;


