# Isaura

Express based route to generate an admin panel so you can focus on the public part of your site.




## Hot to use it

```javascript
var express = require('express');
var isaura = require('adminpanel');

var app = express();

isaura.init({
  models: path.join(__dirname, 'models')
});

app.use('/isaura', isaura.engine() );


```