"use strict"
const jwt = require("jsonwebtoken")

const tokenLasts = "365d"

const User = require("../models/user.model")

exports.findAll = function (req, res) {
  User.findAll(function (err, user) {
    if (err) {
      res.send(err)
    } else {
      console.log("res", user)
      res.send(user)
    }
  })
}

exports.findById = function (req, res) {
  User.findById(req.params.id, function (err, user) {
    if (err) {
      res.send(err)
    } else {
      res.json(user)
    }
  })
}

exports.update = function (req, res) {
  if (
    req.body.constructor === Object &&
    Object.keys(req.body).includes(username) &&
    Object.keys(req.body).includes(password) &&
    Object.keys(req.body).includes(email)
  ) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required field" })
  } else {
    User.update(req.params.id, new User(req.body), function (err, user) {
      if (err) res.send(err)
      res.json({ error: false, message: "User successfully updated" })
    })
  }
}

exports.delete = function (req, res) {
  User.delete(req.params.id, function (err, user) {
    if (err) {
      res.send(err)
    } else {
      res.json({ error: false, message: "User successfully deleted" })
    }
  })
}

exports.doesUsernameExist = function (req, res) {
  User.findByUsername(req.body.username.toLowerCase(), function (err, user) {
    if (user.length) {
      res.json(true)
    } else {
      res.json(false)
    }
  })
}

exports.doesEmailExist = function (req, res) {
  User.findByEmail(req.body.email, function (err, user) {
    if (user.length) {
      res.json(true)
    } else {
      res.json(false)
    }
  })
}

exports.apiLogin = function (req, res) {
  User.login(req.body, function (err, user) {
    if (err) {
      if (err.message === "Wrong username or password.") {
        res.status(404).send({
          error: true,
          message: err.message
        })
      } else {
        res.send(err)
      }
    } else {
      res.json({
        error: false,
        message: "User exists.",
        token: jwt.sign(
          {
            id: user.id,
            username: user.username,
            is_admin: user.is_admin
          },
          process.env.JWTSECRET,
          { expiresIn: tokenLasts }
        ),
        username: user.username,
        is_admin: user.is_admin
      })
    }
  })
}

exports.apiRegister = function (req, res) {
  User.register(req.body, function (err, user) {
    if (err) {
      res.status(500).send(err)
    } else {
      res.json({
        error: false,
        message: "User added successfully!",
        token: jwt.sign(
          {
            id: user.id,
            username: user.username,
            is_admin: user.is_admin
          },
          process.env.JWTSECRET,
          { expiresIn: tokenLasts }
        ),
        username: user.username,
        is_admin: user.is_admin
      })
    }
  })
}
