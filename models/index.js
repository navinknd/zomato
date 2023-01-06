const dbConfig = require("../config/db.config");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: 0,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

// to connect database
sequelize.authenticate().then(() => {
    console.log("Connection has been established successfully.");
}).catch((err) => {
    console.error('unable to connect the database', err);
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// create tables mention models  will create

db.user=require('./user.model')(sequelize, Sequelize);

// after creating model using sync tables are creating
db.sequelize.sync()
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });

module.exports = db;