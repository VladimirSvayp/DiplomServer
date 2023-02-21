const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const typeRouter = require('./typeRouter')
const brandRouter = require('./brandRouter')
const productRouter = require('./productRouter')
const basketProductRouter = require('./basketProductRouter')
const basketRouter = require('./basketRouter')
const productInfosRouter = require('./productInfosRouter')

router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/brand', brandRouter)
router.use('/product', productRouter)
router.use('/basket_product', basketProductRouter)
router.use('/basket', basketRouter)
router.use('/product_infos', productInfosRouter)

module.exports = router