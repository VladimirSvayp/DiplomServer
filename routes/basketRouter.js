const {Router} = require('express')
const basketController = require('../controllers/basketController')
const router = new Router()

router.post('/', basketController.getId)

module.exports = router