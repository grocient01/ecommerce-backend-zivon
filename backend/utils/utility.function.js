const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {JWT} = require('../config/config')


const checkPassword = (password, storedPassword) => {
  if (password === storedPassword) {
      return true
  } else {
    return false
  }
}


const newToken = user => {
  return jwt.sign({id: user._id}, JWT.jwt, {
    expiresIn: JWT.jwtExp,
  })
}

const verifyToken = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, JWT.jwt, (err, payload) => {
      if (err) return reject(err)
      resolve(payload)
    })
  })

module.exports = {checkPassword, newToken, verifyToken}
