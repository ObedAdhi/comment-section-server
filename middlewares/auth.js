const { verifyToken } = require("../helper/jwt");
const Comment = require("../models/comment");
const Reply = require("../models/reply");
const User = require("../models/user");

async function authentication (req, res, next) {
  try {
    const decodeToken = verifyToken(req.headers.access_token)
    const email = decodeToken.email
    console.log(email);

    const user = await User.findByEmail(email)
    if (!user) {
      return next ({name: "WRONG_LOGIN"})
    }
    req.user = user
    return next()

  } catch (err) {
    console.log(err);
    next({name: "NOT_LOGGED_IN"})
  }
}

async function authorizationForComment (req, res, next) {
  try {
    const id = req.params.commentId
    const comment = await Comment.findOne(id)
    if (!comment) {
      return next({ name: "NOT_FOUND"})
    } else if (req.user.email !== comment.email) {
      return next({ name: "UNAUTHORIZED"})
    } else {
      return next()
    }
  } catch (err) {
    console.log(err);
    next(err)
  }
}

async function authorizationForReply (req, res, next) {
  try {
    const id = req.params.replyId
    const reply = await Reply.findOne(id)
    if (!reply) {
      return next({ name: "NOT_FOUND"})
    } else if (req.user.email !== reply.email) {
      return next({ name: "UNAUTHORIZED"})
    } else {
      return next()
    }
  } catch (err) {
    console.log(err);
    next(err)
  }
}

module.exports = {
  authentication,
  authorizationForComment,
  authorizationForReply
}