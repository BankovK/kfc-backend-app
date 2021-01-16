"use strict"

const Product = require("../models/product.model")

exports.findAll = function (req, res) {
  Product.findAll(function (err, products) {
    if (err) {
      res.send(err)
    } else {
      let types = []
      function capitalizeType(type) {
        let words = type.split("_")
        for (let i = 0; i < words.length; i++) {
          words[i] = words[i].charAt(0).toUpperCase() + words[i].substring(1)
        }
        return words.join(" ")
      }
      products.forEach(product => {
        let type = product.type
        let typeNames = types.map(e => e.forUrl)
        if (!typeNames.includes(type)) {
          types.push({ forUrl: type, capitalized: capitalizeType(type) })
        }
      })
      console.log({ products, types })
      res.send({ products, types })
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
