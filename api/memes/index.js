const express = require('express')
const controller = require('./meme.controller')
const uploadController = require('./upload.controller')

const router = express.Router()

router.get("/", controller.index)
router.post("/", uploadController.upload)
router.get("/user/:id", controller.byUser)
router.get("/recent", controller.getRecent)
router.get("/favorites", controller.getFavs)
router.post("/favorite", controller.favorite)
router.get("/:id", controller.show)
router.delete("/:id", controller.destroy)

module.exports = router