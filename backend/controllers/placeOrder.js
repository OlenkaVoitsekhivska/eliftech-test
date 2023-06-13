const {Order} = require('../models/order');

const placeOrder = async (req, res) => {
    const data = req.body;
  const result = await Order.create({ ...data });
  console.log('THIS IS RESULT',   result)
  res.json(result);
};

module.exports = placeOrder;