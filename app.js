if (process.env.NODE_ENV === "development") {
  require("dotenv").config()
}

const express = require("express")
const app = express()
const PORT = process.env.PORT || 3000
const errorHandler = require("./middlewares/errorHandler")
const { connect } = require("./config/mongoDB")
const cors = require("cors")

connect().then(async (db) => {
  const router = require("./routes")
  app.use(cors())
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
  
  app.use(router)
  app.use(errorHandler)
  
  app.listen(PORT, () => {
    console.log("App running on port: ", PORT);
  })

})