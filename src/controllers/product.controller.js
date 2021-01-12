"use strict"

const Product = require("../models/product.model")

exports.findAll = function (req, res) {
  Product.findAll(function (err, products) {
    if (err) {
      res.send(err)
    } else {
      res.send(products)
    }
  })
}

exports.findById = function (req, res) {
  Product.findById(req.params.id, function (err, product) {
    if (err) {
      res.send(err)
    } else {
      res.json(product)
    }
  })
}
