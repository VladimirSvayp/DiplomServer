const Router = require('express')
const router = new Router()
const productInfosController = require('../controllers/productInfosController')

router.post('/', productInfosController.getInfos)

module.exports = router