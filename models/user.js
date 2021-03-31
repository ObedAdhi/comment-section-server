// email, password, name, createdAt

const { ObjectId } = require("mongodb");
const { getDatabase } = require("../config/mongoDB");
const { hashPassword } = require("../helper/bcryptjs");
const usersDB = getDatabase().collection("users")

class User {
  static create(user) {
    user.password = hashPassword(user.password)
    return usersDB.insertOne(user)
  }

  static findByEmail(email) {
    return usersDB.findOne({email})
  }
}

module.exports = User