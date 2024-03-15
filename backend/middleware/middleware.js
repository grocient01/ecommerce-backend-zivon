const  User = require('../models/User')
const {verifyToken} = require('../utils/utility.function')

const sendResponseError = (statusCode, msg, res) => {
  res.status(statusCode || 400).send(!!msg ? msg : 'Invalid input !!')
}

const verifyUser = async (req, res, next) => {
  console.log(req.headers);
  const { token } = req.headers;
  
  try {
    const payload = await verifyToken(token)
    console.log(payload)
    if (payload) {
      const user = await User.findById(payload.id, {password: 0})

      req['user'] = user

      next()
    } else {
      res.status(200).json({message: "Invaild token", code: 404})
    }
  } catch (err) {
    console.log('Error ', err)
    res.status(200).json({ message: "Internal server error", code: 500 });
  }
}

module.exports = {
  sendResponseError,
  verifyUser,
}
