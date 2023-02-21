const { Basket } = require("../models/models")


class BasketController {
    async getId(req, res) {
        const { userId } = req.body
        console.log(`basketController ${userId}`)
        const basket = await Basket.findOne({ where: { userId } })
        return res.json(basket)
    }
}

module.exports = new BasketController()