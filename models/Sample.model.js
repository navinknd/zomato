const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "sample",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      tagId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      assetName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      modelNo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      building: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      site: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      floor: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      zone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      assetImage: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      assetThumbnail: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },

    //   createdBy: {
    //     type: DataTypes.STRING,
    //     allowNull: true,
    //   },
    //   updatedBy: {
    //     type: DataTypes.STRING,
    //     allowNull: true,
    //   },
    },
    {
      sequelize,
      tableName: "sample",
      schema: "public",
      timestamps: true,
      indexes: [
        {
          name: "assets_pkey",
          unique: true,
          fields: [{ name: "id" }],
        },
      ],
    }
  );
};