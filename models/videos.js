"use strict";
module.exports = function(sequelize, DataTypes) {
  var videos = sequelize.define("videos", {
    audience: DataTypes.INTEGER,
    bookmarks_total: DataTypes.INTEGER,
    broadcasting: DataTypes.BOOLEAN,
    channel: DataTypes.STRING,
    country: DataTypes.STRING,
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    duration_formatted: DataTypes.STRING,
    start_time: DataTypes.DATE,
    end_time: DataTypes.DATE,
    explicit: DataTypes.BOOLEAN,
    source_video_id: DataTypes.STRING,
    language: DataTypes.STRING,
    metadata_credit_actors: DataTypes.STRING,
    metadata_credit_director: DataTypes.STRING,
    metadata_genre: DataTypes.STRING,
    metadata_original_title: DataTypes.STRING,
    onair: DataTypes.BOOLEAN,
    owner: DataTypes.STRING,
    poster_url: DataTypes.TEXT,
    recurrence: DataTypes.STRING,
    status: DataTypes.STRING,
    tags: DataTypes.ARRAY(DataTypes.JSON),
    thumbnail_url: DataTypes.TEXT,
    video_url: DataTypes.TEXT,
    views_last_hour: DataTypes.INTEGER,
    views_last_day: DataTypes.INTEGER,
    views_last_week: DataTypes.INTEGER,
    views_last_month: DataTypes.INTEGER,
    views_last_total: DataTypes.INTEGER,
    embed_html: {
        type: DataTypes.TEXT,
        allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        videos.belongsToMany(models.users, {
          through: 'users_videos',
          foreignKey: 'video_id'
        });
      }
    }
  });
  return videos;
};