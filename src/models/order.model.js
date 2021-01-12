"use strict"
var dbConn = require("../../config/db.config")

var Order = function (order, user) {
  this.username = user.username
  this.status = order.status
  this.client_id = user.id
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

// Order.findAll = function (result) {
//   dbConn.query("SELECT * FROM orders", function (err, res) {
//     if (err) {
//       console.log("error: ", err)
//       result(err, null)
//     } else {
//       console.log("Orders : ", res)
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
        result(null, null)
      }
    }
  )
}

// Order.update = function (id, order, result) {
//   dbConn.query(
//     "UPDATE orders SET username=?, client_id=? WHERE id = ?",
//     [order.username, order.status, order.client_id, id],
//     function (err, res) {
//       if (err) {
//         console.log("error: ", err)
//         result(err, null)
//       } else {
//         result(null, res)
//       }
//     }
//   )
// }

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
