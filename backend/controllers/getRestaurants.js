const { Restaurant } = require("../models/restaurant");

const getRestaurants = async (req, res) => {
  const result = await Restaurant.find({});

  const attachedShopId = result.map((shop) => ({
    _id: shop._id,
    name: shop.name,
    menu: shop.menu.map((item) => ({
      _id: item._id,
      title: item.title,
      price: item.price,
      qnt:item.qnt,
      shopId: shop._id,
    })),
  }));

  res.json(attachedShopId);
};

module.exports = getRestaurants;
