const express = require('express')
const {
  addProductInCart,
  deleteProductInCart,
  getCartProducts,
} = require('../controller/cart.controller')
const {verifyUser} = require('../middleware/middleware')
const router = express.Router()

router
  .route('/')
  .get([verifyUser], getCartProducts)
  .post([verifyUser], addProductInCart)

router.route('/delete-cart').delete([verifyUser], deleteProductInCart)

module.exports = router
