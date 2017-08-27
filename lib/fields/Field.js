const utils = require('keystone-utils');
const Sequelize = require('sequelize');
const _ = require('lodash');

class Field{


  constructor(properties){
    this.label = options.label || utils.keyToLabel(this.path);
  }

}

Field.DataType = Sequelize.STRING;

Field.column = (properties) => {
  properties = _.omit(properties, ['type']);  
  return _.defaults(properties, {
    type: Field.DataType,
    allowNull: true,
    defaultValue: null,
  });
};

module.exports = Field;