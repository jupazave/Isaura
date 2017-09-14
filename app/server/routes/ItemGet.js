const utils = require('keystone-utils');
const url = require('url');

module.exports = (req, res) => {
  let locals = req.locals;

  let key = req.params.item;
  let id = req.params.id;
  let isNew = (!!id);
  let list = req.isaura.getList(key, res);
  let title = utils.titlecase(list.plural);

  let fields = list.fieldsArray.map((field) => {
    let name = utils.titlecase(field.name);
    return {key: field.key, name, mixin: field.type.mixin}
  });

  locals.title = title;
  locals.fields = fields;

  res.render('item', locals);  
}