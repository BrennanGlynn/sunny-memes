const express = require('express')
const controller = require('./meme.controller')

const router = express.Router()

router.get("/",            controller.index)
router.post("/",           controller.create)
router.get("/mine",        controller.getMine)
router.get("/recent",      controller.getRecent)
router.get("/favorites",   controller.getFavs)
router.post("/favorite",   controller.favorite)
router.get("/:id",         controller.show)
router.delete("/:id",      controller.destroy)

module.exports = router