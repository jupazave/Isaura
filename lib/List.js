const utils = require('keystone-utils');
const Field = require('./fields/Field');
const _ = require('lodash');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


module.exports = (isaura) => {
  
  class List {
    constructor(key, options = {}) {
      this.key = key;
      this.options = options;
      this.plural = utils.plural(this.key);
      this.singular = utils.singular(this.key);
      this.path = this.get('path') || utils.keyToPath(key, true);
      this.label = this.get('label') || utils.titlecase(utils.plural(this.key));
      
      this.fields = {};
      this.fieldsArray = [];
      this.fieldTypes = {};
      
      isaura.addList(this);
    }
    
    get(key){
      return this.options[key];
    }
    
    set(key, value){
      this.options[key] = value;
    }
    
    build(fields){
      
      let fields_keys = Object.keys(fields);
      let schema = {};
      
      fields_keys.forEach((field_key) => {
        let field = fields[field_key];
        let type = fields[field_key].type;
        schema[field_key] = _.omit(field, ['type']);  
        schema[field_key].type = type.DataType;
        
        this.fields[field_key] = field;
        this.fieldsArray.push(_.merge(field, {key: field_key, name: utils.singular(field_key)}));
        this.fieldTypes[field_key] = type;
        
      });
      
      schema['created_at'] = Date;
      schema['updated_at'] = Date;
      
      
      this.schema = new Schema(schema);
    }

    relationship(){
      throw new Error('to be implemented');
    }
    
    addMethod (key, method){
      if (this.schema.methods.hasOwnProperty(key)) 
      throw new Error(`Method '${key}' can't be set in model '${this.name}'.`);
      
      this.schema.methods[key] = method;
    }
    
    register(){
      this.model = mongoose.model(this.singular, this.schema);

    }
    
  }
  
  return List;
}
