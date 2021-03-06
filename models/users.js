"use strict";
module.exports = function(sequelize, DataTypes) {
  var users = sequelize.define("users", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { msg: 'That username already exists' }
    },
    password_digest: DataTypes.TEXT,
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: { msg: 'An account already exists for that email address' },
      allowNull: false,
      validate: {
        isEmail: { msg: 'Not a valid email address'}
      }
    },
    birthdate: {
      type: DataTypes.DATE,
      validate: {
        isDate: true,
        isAfter: '1/1/1895'
      }
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  }, {
    classMethods: {
      associate: function(models) {
        users.belongsToMany(models.videos, {
          through: 'users_videos',
          foreignKey: 'user_id'
        });
      }
    }
  });
  return users;
};