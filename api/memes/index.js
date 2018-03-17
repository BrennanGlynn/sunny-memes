const express = require('express')
const controller = require('./meme.controller')
const cloudController = require('./upload.controller')

const router = express.Router()

router.get("/", controller.index)
router.post("/", cloudController.upload)
router.get("/user/:id", controller.byUser)
router.get("/recent", controller.getRecent)
router.get("/favorites", controller.getFavs)
router.post("/favorite", controller.favorite)
router.get("/:id", controller.show)
router.delete("/:id",  cloudController.destroy)

module.exports = router