
const Isaura = require('./lib/core');
let isaura = new Isaura();

isaura.Types = require('./lib/FieldTypes');
isaura.List = require('./lib/List')(isaura);

module.exports = isaura;