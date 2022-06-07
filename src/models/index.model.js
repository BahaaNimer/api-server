'use strict';
require('dotenv').config();
// const DATABASE_URL = process.env.DATABASE_URL;
const POSTGRES_URI = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL;

const { Sequelize, DataTypes } = require('sequelize');

const food = require('./food.model');
const Clothes = require('./clothes.model');
const Collection = require('./lib/collection-class');

let sequelizeOptions =
  process.env.NODE_ENV === "production"
    ?
    {
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    } : {};

let sequelize = new Sequelize(POSTGRES_URI, sequelizeOptions);

const foodModel = food(sequelize, DataTypes);
const clothesModel = Clothes(sequelize, DataTypes);

const foodCollection = new Collection(foodModel);
const clothesCollection = new Collection(clothesModel);

module.exports = {
  db: sequelize,
  Food: foodCollection,
  Clothes: clothesCollection,
};