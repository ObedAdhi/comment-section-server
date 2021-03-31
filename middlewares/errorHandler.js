function errorHandler(err, req, res, next) {
  if (err) {
    switch (err.name) {
      case "EMAIL_ALREADY_USED":
        return res.status(400).json({
          message: "Email Already used!"
        })

      case "EMPTY_COMMENT":
        return res.status(400).json({
          message: "Cannot post empty comment!"
        })

      case "WRONG_LOGIN":
        return res.status(401).json({
          message: "Wrong email / password!"
        })

      case "NOT_LOGGED_IN":
        return res.status(401).json({
          message: "Please Log in First!"
        })

      case "UNAUTHORIZED":
        return res.status(401).json({
          message: "Unauthorized to do this action"
        })

      case "NOT_FOUND":
        return res.status(404).json({
          message: "Not Found"
        })
    
      default:
        console.log(err);
        return res.status(500).json({
          message: "Internal Server Error"
        })
    }
  }
}

module.exports = errorHandler