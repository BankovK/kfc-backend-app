"use strict"

const mysql = require("mysql")
//local mysql db connection
const dbConn = mysql.createConnection({
  host: "sql7.freesqldatabase.com",
  port: "3306",
  user: "sql7387746",
  password: "8MjvEpGki9",
  database: "sql7387746"
})
dbConn.connect(function (err) {
  if (err) throw err
  console.log("Database Connected!")
})

module.exports = dbConn
