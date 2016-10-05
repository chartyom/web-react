var oauth2          = require('../../handlers/oauth2'),
    moment          = require('moment');

/*
 GET — получение ресурса
 POST — создание ресурса
 PUT — обновление ресурса
 DELETE — удаление ресурса

 OAUTH2

 authorization
 http POST http://localhost:3000/v1/auth grant_type=password client_id=1 client_secret=123 username=leo240532@yandex.ru password=123456

 authorization refresh token
 http POST http://localhost:3000/v1/auth  grant_type=refresh_token client_id=1 client_secret=123 refresh_token=TOKEN

 authenticate user
 http GET http://localhost:3000/v1/users/profile Authorization:'Bearer TOKEN'

 */

module.exports = function(app){
    app.post('/auth', oauth2.authorization);
};