const utils = require('keystone-utils');
const urljoin = require('url-join');

module.exports = (req, res, next) => {
  let menu = req.isaura.listsArray.map((list) => {
    let path = urljoin(req.locals.root, list.path);
    return { label: list.label, path };
  });


  req.locals.menu = menu;
  return next();
}