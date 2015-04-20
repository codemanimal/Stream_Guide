"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.addColumn('videos', 'embed_html', {
    	type: DataTypes.TEXT,
    	allowNull: false
    }).done(done);
  },

  down: function(migration, DataTypes, done) {
    migration.removeColumn('videos', 'embed_html').done(done);
  }
};