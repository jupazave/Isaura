const utils = require('keystone-utils');
const url = require('url');

module.exports = (req, res) => {
  let locals = req.locals;

  let key = req.params.item;
  let id = req.params.id;
  let isNew = (id === 'new');
  let list = req.isaura.getList(key, res);
  let title = utils.titlecase(list.plural);

  let fields = list.fieldsArray.map((field) => {
    let name = utils.titlecase(field.name);
    return {key: field.key, name, mixin: field.type.mixin}
  });

  locals.title = title;
  locals.fields = fields;

  if(isNew){
    locals.item = {};
    res.render('item', locals);  
  } else {

  list.model.findById(id)
    .then((item) => {

      locals.item = item;
      return res.render('item', locals);  
    });

  }
}