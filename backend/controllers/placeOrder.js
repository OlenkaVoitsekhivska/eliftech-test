const {Order} = require('../models/order');

const placeOrder = async (req, res) => {
    const data = req.body;
  const result = await Order.create({ ...data });
  console.log('incoming order', req.body)
  // console.log('THIS IS RESULT',   result)
  res.status(200).json({
    success:true,
    order:result
  });
};

module.exports = placeOrder;