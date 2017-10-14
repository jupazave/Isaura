const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const utils = require('keystone-utils');
const mongoose = require('mongoose');
const Bluebird = require('bluebird');
const InitLocals = require('./../app/server/middleware/InitLocals');
const NavbarMiddleware = require('./../app/server/middleware/NavbarBuilder');
mongoose.Promise = Bluebird;

class Isaura{
  
  constructor() {
    this.lists = {};
    this.listsArray = [];
    this.app = express();
    this.options = {}
  }

  init(options){

    this.models(options.models || '');
    this.set('root', options.root || 'isaura');
    mongoose.connect(options.mongodb);

    this.expressSetup();
  }

  models(dirname){
    require('require-dir-all')(dirname);
  }

  addList(list) {
    this.lists[list.plural] = list;
    this.listsArray.push(list)
  }

  get(key){
    return this.options[key];
  }
  
  set(key, value){
    this.options[key] = value;
  }
  
  expressSetup() {
    this.app.set('views', path.join(__dirname, '..', 'app', 'server', 'views'));
    // Models should be loaded
    this.app.set('view engine', 'pug');
    this.app.use(bodyParser.json({}));
    this.app.use(bodyParser.urlencoded({ extended: true }));
    // this.app.use(multer({ includeEmptyFields: true }));
    
    let router = express.Router();
    router.use( (req, res, next) => {
      req.isaura = this;
      next();
    });

    router.use(InitLocals);
    router.use(NavbarMiddleware);
    
    let Lists = require('../app/server/routes/index');
    let Items = require('../app/server/routes/Items');
    let ItemGet = require('../app/server/routes/ItemGet');
    let ItemPost = require('../app/server/routes/ItemPost');
    
    /*
    let SigninRoute = require('./app/signin');
    let SignoutRoute = require('./app/signout');
    
    // Init API request helpers
    router.use('/api', require('./app/middleware/apiError'));
    router.use('/api', require('./app/middleware/logError'));
    
    // #1: Session API
    router.get('/api/session', require('../api/session/get'));
    router.post('/api/session/signin', require('../api/session/signin'));
    router.post('/api/session/signout', require('../api/session/signout'));
    */
    
    // #3: Home route
    router.get('/:item', Items);

    router.get('/:item/:id', ItemGet);
    router.post('/:item/:id', ItemPost);

    router.get('/', Lists);

    this.app.use('/', router);
  }
  
  createRouter (){
    return express.Router();
  }
  
  engine(){
    return this.app;
  }

  getList(key, res){
    if(!this.lists.hasOwnProperty(key)) return res.sendStatus(404);
    return this.lists[key];
  }

  
}


Isaura.version = require('./../package.json').version;

module.exports = Isaura;
