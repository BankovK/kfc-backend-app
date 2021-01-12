"use strict"

var dbConn = require("../../config/db.config")

var Product = function (product) {
  this.name = product.name
  this.email = product.email
  this.password = product.password
}

Product.findById = function (id, result) {
  dbConn.query("SELECT * FROM products WHERE id = ?", id, function (err, res) {
    if (err) {
      console.log("error: ", err)
      result(err, null)
    } else {
      result(null, res[0])
    }
  })
}

Product.findAll = function (result) {
  dbConn.query("SELECT * FROM products", function (err, res) {
    if (err) {
      console.log("error: ", err)
      result(err, null)
    } else {
      result(null, res)
    }
  })
}

module.exports = Product
