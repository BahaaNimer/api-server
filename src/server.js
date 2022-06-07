'use strict';
require('dotenv').config();

const PORT = process.env.PORT || 3000;


// 3rd party packages
const express = require('express');

//local modules
const notFoundHandler = require('./error/404');
const errorHandler = require('./error/500');
const foodRouter = require('./routes/food.route');
const clothesRouter = require('./routes/clothes.route');

const app = express();
app.use(express.json());


app.use(foodRouter);
app.use(clothesRouter);
app.use('*', notFoundHandler);
app.use(errorHandler);

function start(PORT) {
  app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
  });
}

module.exports = {
  app: app,
  start: start
};