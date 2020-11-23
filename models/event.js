'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Event.belongsTo(models.User, {
        foreignKey: 'creatorId',
        as: 'creator'
      });
      models.Event.belongsToMany(models.User, {
        through: models.Events_Users,
        as: 'participants',
        foreignKey: 'eventId',
        otherKey: 'userId',
      });
    }
  }
  Event.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    creatorId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING(140),
      allowNull: false
    },
    location: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    datetime: {
      type: DataTypes.DATE,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Event',
    timestamps: false,
  });
  return Event;
};