const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    name: String,
    image:{
      type: String,
      default: "https://static.vecteezy.com/system/resources/thumbnails/024/553/534/small/lion-head-logo-mascot-wildlife-animal-illustration-generative-ai-png.png"
    },
    password: {
      type: String,
      required: true,
    },
    mobile: {
      type : Number,
      require: true,
    },
    address: String,
    active: Boolean,
    otp: String,
    shippingAddress: Object
  },
  {
    timestamps: true,
  },
)





const User = mongoose.model('user', userSchema)


module.exports = User;
