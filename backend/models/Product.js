const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: Number,
    thumbnail: String,
    images: Array,
    stock: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required : true
    },
    rating: Number,
    category: String,
    volt: Number,
    ah: Number,
    warranty: Number,

  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("product", productSchema);

module.exports = Product;
