'use strict';
const express = require('express');

const { Food } = require('../models/index.model');

const foodRouter = express.Router();

//add routes here
foodRouter.get('/food', getFoods);
foodRouter.get('/food/:id', getOneFood);
foodRouter.post('/food', addFood);
foodRouter.put('/food/:id', updateFood);
foodRouter.delete('/food/:id', deleteFood);

//add callback functions here
async function getFoods(req, res) {
  let foods = await Food.read();
  res.status(200).json(foods);
}
async function getOneFood(req, res) {
  let foodId = parseInt(req.params.id);
  let food = await Food.read(foodId);
  res.status(200).json(food);
}
async function addFood(req, res) {
  let newFood = req.body;
  let food = await Food.create(newFood);
  res.status(201).json(food);
}
async function updateFood(req, res) {
  const id = req.params.id;
  const obj = req.body;
  let updatedRecord = await Food.update(id, obj)
  res.status(201).json(updatedRecord);
}
// async function handleUpdate(req, res) {
//   const id = req.params.id;
//   const obj = req.body;
//   let updatedRecord = await req.model.update(id, obj)
//   res.status(201).json(updatedRecord);
// }
async function deleteFood(req, res) {
  let foodId = parseInt(req.params.id);
  let foundFood = await Food.read(foodId);
  if (foundFood) {
    let deletedFood = await Food.delete(foodId);
    res.status(204).json(deletedFood);
  } else {
    res.status(404).json({ message: 'Food not found' });
  }
}

module.exports = foodRouter;