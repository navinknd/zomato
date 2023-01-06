const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
    return sequelize.define(
        "user",
        {
            id: {
                autoIncrement: true,
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: true,
                unique: true
            },
            password: {
                type: DataTypes.STRING,
                allowNull: true,
            }
        },
        {
            sequelize,
            tableName: "user",
            schema: "public",
            timestamps: true,
            indexes: [
                {
                    name: "user_key",
                    unique: true,
                    fields: [{ name: "id" }],
                },
            ],
        }
    );
};