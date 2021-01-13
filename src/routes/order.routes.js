const express = require("express")
const router = express.Router()
const userController = require("../controllers/user.controller")
const orderController = require("../controllers/order.controller")
router.post("/:id/edit", userController.checkIfLoggedIn, orderController.update)
router.post("/", userController.checkIfLoggedIn, orderController.create)
router.get("/", orderController.findAll)
// router.get("/:id", orderController.findById)
// router.delete("/:id", orderController.delete)

module.exports = router
