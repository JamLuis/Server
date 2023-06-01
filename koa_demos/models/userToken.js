const { DataTypes } = require("sequelize");
module.exports = (Sequelize, sequelize, models) => {
  const attributes = {
    id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: true,
      field: "id",
      autoIncrement: true,
    },
    token: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "token",
      autoIncrement: false,
    },
    exp_time: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "exp_time",
      autoIncrement: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      comment: null,
      primaryKey: false,
      field: "user_id",
      autoIncrement: false,
    },
  };
  const UserTokenModel = sequelize.define(
    "user_token",
    attributes,
    {
      timestamps: false,
      freezeTableName: true,
      createdAt: false,
      updatedAt: false
    }
  );
  // return UserTokenModel;
};
