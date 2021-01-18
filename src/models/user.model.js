"use strict"
const bcrypt = require("bcryptjs")
const validator = require("validator")

var dbConn = require("../../config/db.config")

var User = function (user) {
  this.username = user.username
  this.email = user.email
  this.password = user.password
}

User.findById = function (id, result) {
  dbConn.query(
    "SELECT * FROM `user` WHERE id = ? AND is_deleted != 1",
    id,
    function (err, res) {
      if (err) {
        console.log("error: ", err)
        result(err, null)
      } else {
        result(null, res[0])
      }
    }
  )
}

User.findAll = function (result) {
  dbConn.query(
    "SELECT * FROM `user` WHERE is_deleted != 1",
    function (err, res) {
      if (err) {
        console.log("error: ", err)
        result(err, null)
      } else {
        result(null, res)
      }
    }
  )
}

User.update = function (id, user, result) {
  dbConn.query(
    "UPDATE `user` SET username=?,email=?,password=? WHERE id = ?",
    [user.username, user.email, user.password, id],
    function (err, res) {
      if (err) {
        console.log("error: ", err)
        result(err, null)
      } else {
        result(null, res)
      }
    }
  )
}

User.delete = function (id, result) {
  dbConn.query("DELETE FROM `user` WHERE id = ?", [id], function (err, res) {
    if (err) {
      console.log("error: ", err)
      result(err, null)
    } else {
      result(null, res)
    }
  })
}

User.findByUsername = function (username, result) {
  dbConn.query(
    "SELECT * FROM `user` WHERE username = ?",
    username,
    function (err, res) {
      if (err) {
        console.log("error: ", err)
        result(err, null)
      } else {
        result(null, res)
      }
    }
  )
}

User.findByEmail = function (email, result) {
  dbConn.query(
    "SELECT * FROM `user` WHERE email = ?",
    email,
    function (err, res) {
      if (err) {
        console.log("error: ", err)
        result(err, null)
      } else {
        result(null, res)
      }
    }
  )
}

function validateUserData(user) {
  if (typeof user.username != "string") {
    user.username = ""
  }
  if (typeof user.email != "string") {
    user.email = ""
  }
  if (typeof user.password != "string") {
    user.password = ""
  }
}

User.login = function (user, result) {
  validateUserData(user)
  dbConn.query(
    "SELECT * FROM `user` WHERE username = ?",
    user.username,
    function (err, res) {
      if (err) {
        console.log("error: ", err)
        result(err, null)
      } else {
        if (res.length && bcrypt.compareSync(user.password, res[0].password)) {
          result(null, res[0])
        } else {
          result(new Error("Wrong username or password."), null)
        }
      }
    }
  )
}

function validateInput(user) {
  let errors = []
  if (user.username == "") {
    errors.push("You must provide a username.")
  }
  if (user.username != "" && !validator.isAlphanumeric(user.username)) {
    errors.push("Username can only contain letters and numbers.")
  }
  if (!validator.isEmail(user.email)) {
    errors.push("You must provide a valid email address.")
  }
  if (user.password == "") {
    errors.push("You must provide a password.")
  }
  if (user.password.length > 0 && user.password.length < 12) {
    errors.push("Password must be at least 12 characters.")
  }
  if (user.password.length > 50) {
    errors.push("Password cannot exceed 50 characters.")
  }
  if (user.username.length > 0 && user.username.length < 3) {
    errors.push("Username must be at least 3 characters.")
  }
  if (user.username.length > 30) {
    errors.push("Username cannot exceed 30 characters.")
  }

  if (
    user.username.length > 2 &&
    user.username.length < 31 &&
    validator.isAlphanumeric(user.username)
  ) {
    let usernameExists
    User.findByUsername(user.username.toLowerCase(), function (err, user) {
      if (user.length) {
        usernameExists = true
      } else {
        usernameExists = false
      }
    })
    if (usernameExists) {
      errors.push("That username is already taken.")
    }
  }

  if (validator.isEmail(user.email)) {
    let emailExists
    User.findByEmail(user.email, function (err, user) {
      if (user.length) {
        emailExists = true
      } else {
        emailExists = false
      }
    })
    if (emailExists) {
      errors.push("That email is already being used.")
    }
  }

  return errors
}

User.register = function (user, result) {
  validateUserData(user)

  const errors = validateInput(user)
  console.log("errors " + errors)

  if (!errors.length) {
    let salt = bcrypt.genSaltSync(10)
    user.password = bcrypt.hashSync(user.password, salt)
    dbConn.query(
      "CALL p_user_insert_user(?, ?, ?)",
      [user.username, user.password, user.email],
      function (err, res) {
        if (err) {
          console.log("error: ", err)
          result(err, null)
        } else {
          result(null, res[0][0])
        }
      }
    )
  } else {
    result(errors, null)
  }
}

module.exports = User
