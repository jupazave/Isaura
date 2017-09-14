const urljoin = require('url-join');

module.exports = (req, res, next) => {
  if(!req.locals) req.locals = {};
  req.locals.root = urljoin('/', req.isaura.get('root')).replace('//', '/');
  return next();
}