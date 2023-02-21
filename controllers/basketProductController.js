const { Op, where } = require("sequelize")
const { BasketProduct } = require("../models/models")


class BasketProductController {
    async create(req, res) {
        const { basketId, productId } = req.body
        const basket = await BasketProduct.create({ basketId, productId })
        return res.json(basket)
    }
    async getAll(req, res) {
        const { basketId } = req.body
        console.log(`------------${basketId}-------------`)
        const basket = await BasketProduct.findAll({
            where: { basketId }, order: [
                ['productId']
            ]
        })
        return res.json(basket)
    }
    async update(req, res) {
        const { basketId, productId, operation } = req.body
        console.log(`basketId = ${basketId}, productId= ${productId}, operation= ${operation}`);
        const basketProduct = await BasketProduct.findOne({ where: { basketId, productId } })
        console.log(`basketProduct.count = ${basketProduct.count}`)
        if (operation === 'increment') {
            const basket = await BasketProduct.update({ count: basketProduct.count + 1 }, { where: { basketId, productId } })
            return res.json(basket)
        }
        if (operation === 'decrement') {
            const basket = await BasketProduct.update({ count: basketProduct.count - 1 }, { where: { basketId, productId } })
            return res.json(basket)
        }
    }
    async removeAll(req, res) { }
    async removeOne(req, res) {
        const { basketId, productId } = req.body
        console.log(`------------${basketId}${productId}------------------`);
        await BasketProduct.destroy({ where: { basketId, productId } })
        return res.json({mesage: 'deleted'})
    }
}

module.exports = new BasketProductController()