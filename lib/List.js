const Sequelize = require('sequelize');
const utils = require('keystone-utils');
const Field = require('./fields/Field');
const _ = require('lodash');


module.exports = (isaura) => {

  class List {
    constructor(key, scheme, options) {
      this.key = key;
      this.name = utils.titlecase(this.key);
      this.defaultColumns = ['id'];
      this.options = options;
      this.path = this.get('path') || utils.keyToPath(key, true);
      this.fields = {};
      this.fieldsArray = [];
      this.fieldTypes = {};
      this.modelFields = {}
      
      let fields = Object.keys(scheme);
      
      this.fields = fields.map((fieldKey) => {
        let field = scheme[fieldKey];
        let properties = _.omit(field, ['type']);   
        let type = Field;
        if(field.type) type = field.type;

        this.modelFields[fieldKey] = field.column(properties);

      });

      isaura.addList(this);
    }
    
    get(key){
      return this.options[key];
    }
    
    set(key, value){
      this.options[key] = value;
    }
  
    model(){
      return this.name;
    }
    
    addClassMethod (key, method){
      if (this.model.hasOwnProperty(key)) 
        throw new Error(`Class method '${methodName}' can't be set in model '${this.name}'.`);        
      
      this.model[key] = method;        
    }
    
    addInstanceMethod (key, method){
      if (this.model.hasOwnProperty(methodName)) 
        throw new Error(`Instance method '${methodName}' can't be set in model '${this.name}'.`);
      
      this.model.prototype[key] = method;
    }
    
  }

  return List;
}
