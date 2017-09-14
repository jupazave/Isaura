const utils = require('keystone-utils');
const _ = require('lodash');
const Field = require('./Field');

class Image extends Field{
  constructor(properties){
    this.label = options.label || utils.keyToLabel(this.path);
  }
  
}

Image.DataType = String;
Image.mixin = "";

module.exports = Image;