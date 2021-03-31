const router = require("express").Router()
const CommentController = require("../controllers/commentController")
const { authorizationForComment } = require("../middlewares/auth")

router.post("/", CommentController.create)
router.get("/", CommentController.getAll)

router.put("/:commentId", authorizationForComment, CommentController.editComment)
router.delete("/:commentId", authorizationForComment, CommentController.delete)

module.exports = router