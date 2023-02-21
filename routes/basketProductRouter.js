const { Router } = require('express')
const basketProductController = require("../controllers/basketProductController")
const router = new Router()

router.post('/', basketProductController.create)
router.post('/get_all', basketProductController.getAll)
router.put('/', basketProductController.update)
router.post('/remove_one', basketProductController.removeOne)

module.exports = router