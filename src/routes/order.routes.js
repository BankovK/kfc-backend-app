const express = require("express")
const router = express.Router()
const userController = require("../controllers/user.controller")
const orderController = require("../controllers/order.controller")
// router.get("/", orderController.findAll)
router.post("/", userController.checkIfLoggedIn, orderController.create)
// router.get("/:id", orderController.findById)
// router.put("/:id", orderController.update)
// router.delete("/:id", orderController.delete)

module.exports = router
