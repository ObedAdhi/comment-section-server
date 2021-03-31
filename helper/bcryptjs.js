const bcrypjs = require("bcryptjs")

function hashPassword (inputPassword) {
  const salt = bcrypjs.genSaltSync(10)
  return bcrypjs.hashSync(inputPassword, salt)
}

function comparePassword (inputPassword, hashedPassword) {
  return bcrypjs.compareSync(inputPassword, hashedPassword)
}

module.exports = {
  hashPassword,
  comparePassword
}