"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
      },
      password_digest: {
        type: DataTypes.TEXT
      },
      video_id: {
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        unique: true
      },
      birthdate: {
        type: DataTypes.DATE
      },
      state: {
        type: DataTypes.STRING
      },
      city: {
        type: DataTypes.STRING
      },
      active: {
        type: DataTypes.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    }).done(done);
  },
  down: function(migration, DataTypes, done) {
    migration.dropTable("users").done(done);
  }
};