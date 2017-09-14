const utils = require('keystone-utils');
const Field = require('./Field');

class Text extends Field{
  constructor(properties){
    super(properties);
  }
}

Text.DataType = String;
Text.mixin = "text";


module.exports = Text;
