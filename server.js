const dotenv = require("dotenv")
dotenv.config()

const Order = require("./src/models/order.model")

const express = require("express")
const bodyParser = require("body-parser")
const jwt = require("jsonwebtoken")
var cors = require("cors")
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
  setInterval(function () {
    console.log("orders cleanup started")
    Order.deleteFinishedOrders(function (err, res) {
      if (err) {
        throw err
      } else {
        if (res.length) {
          console.log("deleted id ", res)
          socket.broadcast.emit("deletedOrdersFromServer", res)
        }
      }
    })
  }, 60000)

  socket.on("createdOrderFromBrowser", function (data) {
    console.log("soket createdOrderFromBrowser")
    try {
      user = jwt.verify(data.token, process.env.JWTSECRET)
      Order.create(new Order(data, user), data.basket, function (err, order) {
        if (err) {
          console.log("error ", err)
          // error handling
        } else {
          console.log("created order ", order)
          io.emit("createdOrderFromServer", order)
        }
      })
    } catch (e) {
      console.log(e)
    }
  })
  socket.on("updatedOrderFromBrowser", function (data) {
    console.log("soket updatedOrderFromBrowser")
    try {
      user = jwt.verify(data.token, process.env.JWTSECRET)
      if (user.is_admin != 1) throw new Error("User is not admin!")
      Order.update(
        data.order.id,
        new Order(data.order, user),
        function (err, order) {
          if (err) {
            console.log("error ", err)
            // error handling
          } else {
            console.log("updated order ", order)
            socket.broadcast.emit("updatedOrderFromServer", order)
          }
        }
      )
    } catch (e) {
      console.log(e)
    }
  })
})

// listen for requests
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})
