const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const utils = require('keystone-utils');

class Isaura{
  
  constructor() {
    this.lists = [];
    this.app = express();
    this.options = {}
  }

  init({models}){

    
    this.models(models);
    this.expressSetup();
  }

  models(dirname){
    require('require-dir-all')(dirname);
    // console.log(models)
  }

  addList(list) {
    this.lists.push(list)
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
    
    let IndexRoute = require('../app/server/routes/index');
    
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
    router.get('/', IndexRoute);
    
    this.app.use('/', router);
  }
  
  createRouter (){
    return express.Router();
  }
  
  engine(){
    return this.app;
  }
  
}


Isaura.version = require('./../package.json').version;

module.exports = Isaura;
