const utils = require('keystone-utils');
const url = require('url');

module.exports =  (req, res) => {
  let locals = req.locals;

  locals.title = 'Inicio';
  
  let lists = req.isaura.listsArray.map((list) => {
    return {
      name: list.label, 
      key: list.key,
      link: url.resolve(locals.root, list.path)
    }
  });
  
  locals.lists = lists;

  res.render('index', locals);  
}