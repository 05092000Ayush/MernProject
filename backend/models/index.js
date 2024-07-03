const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('backdb', 'root', 'Ayush@@0509', {
  host: 'localhost',//used for removing logs in termial
  dialect: 'mysql' /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
});

try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
const db = {}

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./user')(sequelize, DataTypes)
db.userdetails = require('./userDetails')(sequelize, DataTypes)
db.sequelize.sync({ force: true })
module.exports = db