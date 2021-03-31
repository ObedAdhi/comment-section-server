const { ObjectId } = require("mongodb");
const { getDatabase } = require("../config/mongoDB")
const commentDB = getDatabase().collection("comments")

class Comment {
  static create (comment) {
    comment.commentId = ObjectId(comment.commentId)
    console.log(comment.commentId);
    return commentDB.insertOne(comment)
  }

  static findAll () {
    return commentDB.aggregate([
      {
        "$project": {
          "_id": {
            "$toString": "$_id"
          }, 
          "commentValue": "$commentValue",
          "name": "$name",
          "email": "$email",
          "createdAt": "$createdAt",
        }
      },
      {
        $lookup:
          {
            from: "replies",
            localField: "_id",
            foreignField: "commentId",
            as: "replies"
          }
     }
   ]).sort({createdAt: 1}).toArray()
    // return commentDB.find().toArray()
  }

  static findOne (commentId) {
    const id = {"_id": ObjectId(commentId)}
    return commentDB.findOne(id)
  }

  static updateOne(commentId, commentValue) {
    const id = {"_id": ObjectId(commentId)}
    const newData = {$set: commentValue}
    return commentDB.updateOne(id, newData)
  }

  static delete (commentId) {
    const id = {"_id": ObjectId(commentId)}
    return commentDB.deleteOne(id)
  }
}

module.exports = Comment
