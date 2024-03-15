const Cart = require('../models/Cart');
const Product = require('../models/Product');
const User = require('../models/User');

const getCartProducts = async (req, res) => {
  try {
    const carts = await Cart.find({userId: req.user._id}).populate('productId')
    res.status(200).send({status: 'ok', carts})
  } catch (err) {
    console.log(err)
    sendResponseError(500, `Error ${err}`, res)
  }
}

const addProductInCart = async (req, res) => {
  const { userId, productId, count } = req.body;

  if (!userId || !productId || !count) {
    return res.status(400).json({ message: 'userId, productId, and count are required.' });
  }
  const user = await User.findById(userId)
  const product = await Product.findById(productId)
  if(!user || !product){
    return res.status(404).json({message:"User or product doesn't exists."})
  }
  
  try {
    let existingCartEntry = await Cart.findOne({ userId, productId });

    if (existingCartEntry) {
      existingCartEntry.count = count;
      await existingCartEntry.save();
      return res.status(200).json({ message: 'Cart updated successfully.' });
    } else {
      await Cart.create({ userId, productId, count });
      return res.status(200).json({ message: 'Product added to cart successfully.' });
    }
  } catch (error) {
    console.error('Error adding product to cart:', error);
    return res.status(500).json({ message: 'Internal server error.' });
  }
};



const deleteProductInCart = async (req, res) => {
  const { cartId } = req.body
  if(!cartId){
    return res.status(404).json({message:"cart id is required"})
  }
  try {
    await Cart.findByIdAndRemove(cartId)
    res.status(200).send({status: 'ok'})
  } catch (e) {
    console.log(err)
    sendResponseError(500, `Error ${err}`, res)
  }
}



module.exports = {addProductInCart, deleteProductInCart, getCartProducts}
