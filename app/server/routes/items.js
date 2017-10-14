const utils = require('keystone-utils');
const url = require('url');

module.exports = (req, res) => {
  let locals = req.locals;

  let key = req.params.item;
  let list = req.isaura.getList(key, res);
  let title = list.label;

  locals.link = `${req.locals.root}/${key}`;

  let fields = list.fieldsArray.map((field) => {
    let name = utils.titlecase(field.name);
    return {key: field.key, name}
  });

  list.model.find({})
    .then((items) => {
      items.map((item) => {
        item.link = [locals.link, item._id].join('/');
        return item;
      });

      locals.title = title
      locals.fields = fields;
      locals.items = items;
      
      return res.render('items', locals);  
    });

}