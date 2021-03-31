const Reply = require("../models/reply")

class ReplyController {
  static async create (req, res, next) {
    try {
      const { replyValue, commentId } = req.body

      if (!replyValue || replyValue === "") {
        return next({ name: "EMPTY_COMMENT" })
      }

      const { email, name } = req.user
      const createdAt = new Date()
  
      const reply = {
        replyValue, email, name, createdAt, commentId
      }
      const response = await Reply.create(reply)

      res.status(201).json(response.ops[0])

    } catch (err) {
      console.log(err);
      next(err)
    }
  }
  
  static async getAll (req, res, next) {
    try {
      const replys = await Reply.findAll()
      res.status(200).json(replys)
    } catch (err) {
      console.log(err);
      next(err)
    }
  }

  static async editReply (req, res, next) {
    try {
      const id = req.params.replyId
      const { replyValue } = req.body
      const updatedReply = await Reply.updateOne(id, { replyValue })
      console.log(updatedReply.result);

      if (updatedReply.result.n === 0) {
        return next({ name: 'NOT_FOUND' })
      } else {
        res.status(200).json({ message: 'reply edited', status: updatedReply.result })
      }
    } catch (err) {
      console.log(err);
      next(err)
    }
  }

  static async delete (req, res, next) {
    try {
      const id = req.params.replyId
      const deleteStatus = await Reply.delete(id)

      if (deleteStatus.result.n === 0) {
        return next({name: 'NOT_FOUND'})
      } else {
        res.status(200).json({message: "reply deleted", status: deleteStatus.result})
      }

    } catch (error) {
      next(error)
    }
  }
}

module.exports = ReplyController