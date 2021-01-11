const express = require("express")
const router = express.Router()
const userController = require("../controllers/user.controller")
router.post("/login", userController.apiLogin)
router.post("/register", userController.apiRegister)
router.post("/doesUsernameExist", userController.doesUsernameExist)
router.post("/doesEmailExist", userController.doesEmailExist)
router.get("/:id", userController.findById)
router.put("/:id", userController.update)
router.delete("/:id", userController.delete)

module.exports = router
