const utils = require('keystone-utils');
const Sequelize = require('sequelize');
const Field = require('../Field');

class Text extends Field{
    constructor(properties){
      super(properties);
      
    }
}

Text.DataType = Sequelize.STRING;

module.exports = Text;
