const { comparePassword } = require("../helper/bcryptjs")
const User = require("../models/user")
const { generateToken } = require("../helper/jwt")

class UserController {
  static async register (req, res, next) {
    try {
      const { email, password, name } = req.body
      const user = await User.findByEmail(email)

      if (user) {
        return next({name: 'EMAIL_ALREADY_USED'})
      } else {
        const newUser = await User.create({ email, password, name })
        const payload = {
          _id: newUser.ops[0]._id,
          email: newUser.ops[0].email,
          name: newUser.ops[0].name
        }
        console.log(newUser.ops);
        const access_token = generateToken(payload)
        res.status(201).json({access_token})
      }
    } catch (error) {
      next(error)
    }
  }

  static async login (req, res, next) {
    try {
      const { email, password } = req.body
      console.log(req.body);
      const user = await User.findByEmail(email)

      if (!user) {
        return next({name: 'WRONG_LOGIN'})
      } 
      const isValidPass = comparePassword(password, user.password)
      if (!isValidPass) {
        return next({name: 'WRONG_LOGIN'})
      } else {
        const payload = {
          _id: user._id,
          email: user.email,
          name: user.name
        }
        const access_token = generateToken(payload)
        res.status(200).json({access_token})
      }

    } catch (error) {
      console.log(error);
      next(error)
    }
  }
}

module.exports = UserController