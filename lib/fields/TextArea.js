const utils = require('keystone-utils');
const Field = require('./Field');

class Text extends Field{
  constructor(properties){
    super(properties);
  }
}

Text.DataType = Boolean;
Text.mixin = "textarea";


module.exports = Text;
