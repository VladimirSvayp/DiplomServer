const { ProductInfo } = require("../models/models")


class ProductInfosController {
    async getInfos(req, res) {
        const { productId } = req.body
        const info = await ProductInfo.findAll({ where: { productId } })
        return res.json(info)
    }
}

module.exports = new ProductInfosController()