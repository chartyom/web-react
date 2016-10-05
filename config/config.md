# Config file
Configuration application

``` js
{
    //Главная ссылка на ресурс
    "url": "http://localhost:3000",
    "mail": {
        "transport": "SMTP",
            "options": {
                "service": "", 
                "auth": {
                    "user": "", 
                    "pass": ""  
                }
            }
        },
    },
    //Подключение к базе данных
    "database": {
        "client": "pg",
        "connection": {
            "host": "localhost",
            "user": "",
            "password": "",
            "database": "",
            "charset": "utf8"
        },
        "pool": {
            "min": 1,
            "max": 10
        }
    },
    "server": {
        "host": "localhost",
        "port": "3000"
    },
    "paths": {
        "content": "public",
        "root": "/",
        "core": "core/",
        "images": "images/"
    },
    "users": {
        //Время активности пользователя
        "tokenLife": 14200,
        "photo": {
            "extensions": [
                ".jpg",
                ".jpeg",
                ".png"
            ]
        }
    },
    "uploads": {
        // Used by the upload API to limit uploads to images
        "extensions": [
            ".jpg",
            ".jpeg",
            ".gif",
            ".png",
            ".svg",
            ".svgz"
        ],
        "contentTypes": [
            "image/jpeg",
            "image/png",
            "image/gif",
            "image/svg+xml"
        ]
    }
}
```