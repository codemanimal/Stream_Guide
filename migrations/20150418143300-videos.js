"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("videos", {
			id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      audience: {
      	type: DataTypes.INTEGER
      },
      bookmarks_total: {
      	type: DataTypes.INTEGER      	
      },
      broadcasting: {
      	type: DataTypes.BOOLEAN
      },
      channel: {
      	type: DataTypes.STRING
      },
      country: {
      	type: DataTypes.STRING
      },
      title: {
      	type: DataTypes.STRING
      },
      description: {
      	type: DataTypes.TEXT
      },
      duration_formatted: {
      	type: DataTypes.STRING
      },
      start_time: {
      	type: DataTypes.DATE
      },
      end_time: {
      	type: DataTypes.DATE
      },
      explicit: {
      	type: DataTypes.BOOLEAN
      },
      source_video_id: {
      	type: DataTypes.STRING,
      	unique: true
      },
      language: {
      	type: DataTypes.STRING
      },
      metadata_credit_actors: {
      	type: DataTypes.STRING
      },
      metadata_credit_director: {
      	type: DataTypes.STRING
      },
      metadata_genre: {
      	type: DataTypes.STRING
      },
      metadata_original_title: {
      	type: DataTypes.STRING
      },
      onair: {
      	type: DataTypes.BOOLEAN
      },
      owner: {
      	type: DataTypes.STRING
      },
      poster_url: {
      	type: DataTypes.TEXT
      },
      recurrence: {
      	type: DataTypes.STRING
      },
      status: {
      	type: DataTypes.STRING
      },
      tags: {
      	type: DataTypes.ARRAY(DataTypes.JSON)
      },
      thumbnail_url: {
      	type: DataTypes.TEXT
      },
      video_url: {
      	type: DataTypes.TEXT
      },
      views_last_hour: {
      	type: DataTypes.INTEGER
      },
      views_last_day: {
      	type: DataTypes.INTEGER
      },
      views_last_week: {
      	type: DataTypes.INTEGER
      },
      views_last_month: {
      	type: DataTypes.INTEGER
      },
      views_last_total: {
      	type: DataTypes.INTEGER
      },
      user_id: {
      	type: DataTypes.INTEGER
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
    migration.dropTable("videos").done(done);
  }
};