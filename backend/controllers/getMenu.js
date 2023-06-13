
const {Restaurant} = require('../models/restaurant');

const getMenu = async (req, res) => {
    const { id } = req.params;
  const result = await Restaurant.findById(id);
  console.log('THIS IS RESULT',   result)
  res.json(result);
};

module.exports = getMenu;