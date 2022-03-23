// config.js

require('dotenv').config();
const {DB, DB_HOST, DB_USERNAME, DB_PASSWORD } = process.env;
module.exports=
{  
  "development": {
    "username": "postgres",
    "password": "1517",
    "database": "alis",
    "host": "localhost",
    "dialect": "postgres"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": "postgres",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
//   "development": {
//     "username": DB_USERNAME,
//     "password": DB_PASSWORD,
//     "database": DB,
//     "host": DB_HOST,
//     "dialect": "postgres"
//   },
//   "test": {
//     "username": DB_USERNAME,
//     "password": DB_PASSWORD,
//     "database": DB,
//     "host": DB_HOST,
//     "dialect": "postgres"
//   },
//   "production": {
//     "username": DB_USERNAME,
//     "password": DB_PASSWORD,
//     "database": DB,
//     "host": DB_HOST,
//     "dialect": "postgres"
// }
}