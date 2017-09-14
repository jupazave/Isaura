const utils = require('keystone-utils');
const Field = require('./Field');

class Boolean extends Field{
  constructor(properties){
    super(properties);
  }
}

Boolean.DataType = String;
Boolean.mixin = "boolean";


module.exports = Boolean;
