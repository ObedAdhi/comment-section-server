const router = require("express").Router()
const ReplyController = require("../controllers/replyController")
const { authorizationForReply } = require("../middlewares/auth")

router.post("/", ReplyController.create)
router.get("/", ReplyController.getAll)

router.put("/:replyId", authorizationForReply, ReplyController.editReply)
router.delete("/:replyId", authorizationForReply, ReplyController.delete)

module.exports = router