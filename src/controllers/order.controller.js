"use strict"

const Order = require("../models/order.model")

exports.findAll = function (req, res) {
  Order.findAll(function (err, order) {
    console.log("controller")
    if (err) {
      res.send(err)
    } else {
      console.log("res", order)
      res.send(order)
    }
  })
}

// exports.findById = function (req, res) {
//   Order.findById(req.params.id, function (err, order) {
//     if (err) {
//       res.send(err)
//     } else {
//       res.json(order)
//     }
//   })
// }

// exports.create = function (req, res) {
//   const new_order = new Order(req.body, req.user)
//   if (
//     (req.body.constructor === Object && Object.keys(req.body).length === 0) ||
//     !Object.keys(req).includes("user") ||
//     !Object.keys(req.body).includes("basket")
//   ) {
//     res
//       .status(400)
//       .send({ error: true, message: "Please provide all required fields" })
//   } else {
//     Order.create(new_order, req.body.basket, function (err, order) {
//       if (err) {
//         res.send(err)
//       } else {
//         res.json({
//           error: false,
//           message: "Order added successfully!",
//           order: order
//         })
//       }
//     })
//   }
// }

// exports.update = function (req, res) {
//   if (
//     (req.body.constructor === Object && Object.keys(req.body).length === 0) ||
//     !Object.keys(req).includes("user") ||
//     !Object.keys(req.body).includes("order")
//   ) {
//     res
//       .status(400)
//       .send({ error: true, message: "Please provide all required fields" })
//   } else {
//     Order.update(
//       req.params.id,
//       new Order(req.body.order, req.user),
//       function (err, order) {
//         if (err) {
//           res.send(err)
//         } else {
//           res.json({
//             error: false,
//             message: "Order successfully updated",
//             order: order
//           })
//         }
//       }
//     )
//   }
// }

exports.delete = function (req, res) {
  Order.delete(req.params.id, function (err) {
    if (err) {
      res.send(err)
    } else {
      res.json({ error: false, message: "Order successfully deleted" })
    }
  })
}
