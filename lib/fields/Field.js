const utils = require('keystone-utils');
const _ = require('lodash');

class Field{
  constructor(properties){
    this.label = options.label || utils.keyToLabel(this.path);
  }
}

Field.DataType = String;
Field.mixin = "";

module.exports = Field;