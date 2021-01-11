const express = require("express")
const bodyParser = require("body-parser")
var cors = require("cors")
const dotenv = require("dotenv")
dotenv.config()
// create express app
const app = express()
app.use(cors())
// Setup server port
const port = process.env.PORT || 5000
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse requests of content-type - application/json
app.use(bodyParser.json())
// Require user routes
const userRoutes = require("./src/routes/user.routes")
app.use("/api/users", userRoutes)
// Require order routes
// const orderRoutes = require("./src/routes/order.routes")
// app.use("/api/orders", orderRoutes)
// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
