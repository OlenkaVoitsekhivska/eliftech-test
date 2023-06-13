const express = require('express');
const cors = require('cors');


const restaurantRouter = require('./routes/api/restaurants');
const ordersRouter = require('./routes/api/orders')

const app = express();


app.use(cors())
app.use(express.json());
app.use(express.static("public"));



app.use('/api/restaurants', restaurantRouter)
app.use('/api/orders', ordersRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message })
})

  
module.exports = app