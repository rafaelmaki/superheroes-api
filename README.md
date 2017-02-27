# superheroes-api
Super Hero Catalogue REST api. It handles CRUD operations of super heroes, their super powers, their protection area and the users that can access the system.

## Install dependencies
npm install

## Database
You need to use an instance of MySQL database.

Modify the configuration of your database on config/config.json file

        "mysql_config": {
            "host": "localhost",
            "user": "user",
            "password" : "password",
            "port" : 3306,
            "database": "superheroes"
        }

Create a schema and run the create tables script file (/db/create_db.sql)

## Authentication
Before you call any of APIs (except /login), you need to call /login to get a JWT token.

You have to pass the JWT token on Authorization Header (Format: "Bearer [token]")