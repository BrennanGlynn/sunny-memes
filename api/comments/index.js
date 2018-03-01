const express = require('express')
const controller = require('./comment.controller')

const router = express.Router()

router.post('/:memeId', controller.create)

module.exports = router
