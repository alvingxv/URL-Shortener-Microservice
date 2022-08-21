const express = require('express')
const router = express.Router()
const controller = require('../controllers/controller')

router.post('/shorturl', controller.create)
router.get('/shorturl/:short_url', controller.redirect)
module.exports = { router }