'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Caption extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {foreignKey: 'userId', as: 'user'});
    }
  }
  Caption.init({
    userId: DataTypes.INTEGER,
    imageId: DataTypes.INTEGER,
    captionText: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Caption',
  });
  return Caption;
};