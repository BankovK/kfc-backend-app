const express = require("express")
const bodyParser = require("body-parser")
const jwt = require("jsonwebtoken")
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
const orderRoutes = require("./src/routes/order.routes")
app.use("/api/orders", orderRoutes)
// Require product routes
const productRoutes = require("./src/routes/product.routes")
app.use("/api/products", productRoutes)

const server = require("http").createServer(app)
const io = require("socket.io")(server, {
  pingTimeout: 30000,
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
})

io.on("connection", function (socket) {
  socket.on("orderFromBrowser", function (data) {
    try {
      jwt.verify(data.token, process.env.JWTSECRET)
      socket.broadcast.emit("orderFromServer", data.order)
    } catch (e) {
      console.log("Token is invalid!")
    }
  })
  socket.on("deleteOrderFromBrowser", function (data) {
    try {
      jwt.verify(data.token, process.env.JWTSECRET)
      socket.broadcast.emit("deleteOrderFromServer", data.orderId)
    } catch (e) {
      console.log("Token is invalid!")
    }
  })
  socket.on("updateOrderFromBrowser", function (data) {
    try {
      jwt.verify(data.token, process.env.JWTSECRET)
      socket.broadcast.emit("updateOrderFromServer", data.order)
    } catch (e) {
      console.log("Token is invalid!")
    }
  })
})

// listen for requests
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
