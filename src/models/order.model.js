"use strict"
var dbConn = require("../../config/db.config")

var Order = function (order, user) {
  this.username = user.username
  this.status = order.status
  this.client_id = user.id
}

Order.findAll = function (result) {
  dbConn.query(
    "SELECT * FROM orders ORDER BY created_at ASC",
    function (err, res) {
      if (err) {
        console.log("error: ", err)
        result(err, null)
      } else {
        console.log("Orders : ", res)
        result(null, res)
      }
    }
  )
}

// Order.findById = function (id, result) {
//   dbConn.query("SELECT * FROM orders WHERE id = ?", id, function (err, res) {
//     if (err) {
//       console.log("error: ", err)
//       result(err, null)
//     } else {
//       result(null, res)
//     }
//   })
// }

function backetToString(basket) {
  return basket
    .map(product => {
      return `( last_insert_id(), ${product.id}, ${product.quantity})`
    })
    .join(",")
}

Order.create = function (newOrder, basket, result) {
  basket = backetToString(basket)
  dbConn.query(
    "CALL insert_order(?, ?, ?)",
    [newOrder.username, newOrder.client_id, basket],
    function (err, res) {
      if (err) {
        console.log("error: ", err)
        result(err, null)
      } else {
        result(null, res[0][0])
      }
    }
  )
}

Order.update = function (id, order, result) {
  dbConn.query(
    "CALL update_order(?, ?)",
    [order.status, id],
    function (err, res) {
      if (err) {
        console.log("error: ", err)
        result(err, null)
      } else {
        console.log("here", res[0][0])
        result(null, res[0][0])
      }
    }
  )
}

// Order.delete = function (id, result) {
//   dbConn.query("DELETE FROM orders WHERE id = ?", [id], function (err, res) {
//     if (err) {
//       console.log("error: ", err)
//       result(err, null)
//     } else {
//       result(null, res)
//     }
//   })
// }

module.exports = Order
