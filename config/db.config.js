require("dotenv").config();
module.exports = {
    HOST: "localhost",
    USER: "postgres",
    PASSWORD: "navin@123",
    DB: "zomato",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};