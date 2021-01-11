"use strict"

const mysql = require("mysql")
//local mysql db connection
const dbConn = mysql.createConnection({
  host: "127.0.0.1",
  port: "3306",
  user: "root",
  password: "greattest",
  database: "kfc-db"
})
dbConn.connect(function (err) {
  if (err) throw err
  console.log("Database Connected!")
})

module.exports = dbConn
