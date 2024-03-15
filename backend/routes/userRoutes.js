const express = require('express')
const {
  signUpUser,
  signInUser,
  getUser,
  updateUserDetails,
  userForgotPassword,
  deleteUserAccount,
  otpVerify,
  resetPassword,
  isUserVerified,
} = require("../controller/user.controller");
const {verifyUser} = require('../middleware/middleware')
const router = express.Router()

router.post('/signup', signUpUser)
router.post("/otp-verify", otpVerify)
router.post('/signin', signInUser)
router.route('/verify').post([verifyUser], isUserVerified)
router.post('/forget-password', userForgotPassword)
router.post('/reset-password', resetPassword)

router.route('/me').get([verifyUser], getUser)
router.route('/update-profile').put([verifyUser], updateUserDetails)

router.route('/delete-account').delete([verifyUser], deleteUserAccount)

module.exports = router
