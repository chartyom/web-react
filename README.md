# nodejs_REST_REACT_
nodejs Application

QUICK START
-----------
First, you need to run the MySQL and import database table db_node.sql.
In config.js, the file you need to make changes to the database connection.

console:

    npm install

    node index.js

LINKS EXAPMLE
-----------
* GET http://localhost:3000/users 
* POST http://localhost:3000/users/registration body: email, password, first_name
* POST http://localhost:3000/oauth body: grant_type, client_id, clietn_secret, username, password
* GET http://localhost:3000/users/info header: Authorization Bearer TOKEN
