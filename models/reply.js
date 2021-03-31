const { ObjectId } = require("mongodb");
const { getDatabase } = require("../config/mongoDB")
const replyDB = getDatabase().collection("replies")

class Reply {
  static create (reply) {
    return replyDB.insertOne(reply)
  }

  static findAll () {
    return replyDB.find().sort({createdAt: 1}).toArray()
  }

  static findOne (replyId) {
    const id = {"_id": ObjectId(replyId)}
    return replyDB.findOne(id)
  }

  static updateOne(replyId, replyValue) {
    const id = {"_id": ObjectId(replyId)}
    const newData = {$set: replyValue}
    return replyDB.updateOne(id, newData)
  }

  static delete (replyId) {
    const id = {"_id": ObjectId(replyId)}
    return replyDB.deleteOne(id)
  }
}

module.exports = Reply
