
const {Restaurant} = require('../models/restaurant');

const getRestaurants = async (req, res) => {
  const result = await Restaurant.find({});
  console.log('THIS IS RESULT',   result)
  res.json(result);
};

module.exports = getRestaurants;