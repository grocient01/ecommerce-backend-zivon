const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    productId: {
      type: mongoose.Types.ObjectId,
      ref: 'product',
      required: true,
    },
    count: {
      type: Number,
      required: true,
    },
    courier: String,
    trackingId: String,
    pickUpAddress: String,
    dropAddress: String,
    amount: Number,
  },
  {
    timestamps: true,
  },
)

const Order = mongoose.model('order', orderSchema)
module.exports = Order
