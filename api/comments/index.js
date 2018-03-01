const express = require('express')
const controller = require('./comment.controller')

const router = express.Router()

router.post('/:memeId', controller.create)
router.put('/:id',      controller.update)
router.delete('/:id',   controller.destroy)

module.exports = router
