const { DataTypes } = require("sequelize");
module.exports = (Sequelize, sequlize, models) => {
  const user = sequlize.define(
    "user",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
        comment: null,
        primaryKey: true,
        field: "id",
        autoIncrement: true,
      },
      userName: {
        type: DataTypes.CHAR(20),
        allowNull: true,
        defaultValue: null,
        comment: null,
        primaryKey: false,
        field: "user_name",
        autoIncrement: false,
      },
      phone: {
        type: DataTypes.CHAR(11),
        allowNull: true,
        defaultValue: null,
        comment: null,
        primaryKey: false,
        field: "phone",
        autoIncrement: false,
      },
      gender: {
        type: DataTypes.CHAR(255),
        allowNull: true,
        defaultValue: null,
        comment: null,
        primaryKey: false,
        field: "gender",
        autoIncrement: false,
      },
      birthday: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
        comment: null,
        primaryKey: false,
        field: "birthday",
        autoIncrement: false,
      },
      password: {
        type: DataTypes.CHAR(255),
        allowNull: true,
        defaultValue: null,
        comment: null,
        primaryKey: false,
        field: "password",
        autoIncrement: false,
      },
      email: {
        type: DataTypes.CHAR(50),
        allowNull: true,
        defaultValue: null,
        comment: null,
        primaryKey: false,
        field: "email",
        autoIncrement: false,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
      createdAt: false,
      updatedAt: false
    }
  );
  // models.user = user;
  // return user;
};
