const Comment = require("../models/comment")

class CommentController {
  static async create (req, res, next) {
    try {
      const { commentValue } = req.body

      if (!commentValue || commentValue === "") {
        return next({ name: "EMPTY_COMMENT" })
      }

      const { email, name } = req.user
      const createdAt = new Date()
  
      const comment = {
        commentValue, email, name, createdAt
      }
      const response = await Comment.create(comment)

      res.status(201).json(response.ops[0])

    } catch (err) {
      console.log(err);
      next(err)
    }
  }
  
  static async getAll (req, res, next) {
    try {
      const comments = await Comment.findAll()
      res.status(200).json(comments)
    } catch (err) {
      console.log(err);
      next(err)
    }
  }

  static async editComment (req, res, next) {
    try {
      const id = req.params.commentId
      const { commentValue } = req.body
      const updatedComment = await Comment.updateOne(id, { commentValue })
      console.log(updatedComment.result);

      if (updatedComment.result.n === 0) {
        return next({ name: 'NOT_FOUND' })
      } else {
        res.status(200).json({ message: 'Comment edited', status: updatedComment.result })
      }
    } catch (err) {
      console.log(err);
      next(err)
    }
  }

  static async delete (req, res, next) {
    try {
      const id = req.params.commentId
      const deleteStatus = await Comment.delete(id)

      if (deleteStatus.result.n === 0) {
        return next({name: 'NOT_FOUND'})
      } else {
        res.status(200).json({message: "Comment deleted", status: deleteStatus.result})
      }

    } catch (error) {
      next(error)
    }
  }
}

module.exports = CommentController