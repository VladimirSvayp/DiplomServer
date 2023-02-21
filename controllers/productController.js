const uuid = require('uuid')
const path = require('path')
const { Product, ProductInfo, BasketProduct } = require('../models/models')
const { Op } = require('sequelize')

class ProductController {
    async create(req, res) {
        try {
            let { name, price, brandId, typeId, count, info } = req.body
            const { image } = req.files
            let fileName
            let product
            if (image) {
                fileName = uuid.v4() + ".jpg"
                image.mv(path.resolve(__dirname, '..', 'static', fileName))
                product = await Product.create({ name, price, brandId, typeId, image: fileName, count })
            } else {
                product = await Product.create({ name, price, brandId, typeId, count })
            }

            if (info) {
                info = JSON.parse(info)
                info.forEach(i =>
                    ProductInfo.create({
                        title: i.title,
                        description: i.description,
                        productId: product.id
                    })
                )
            }
            return res.json({ product })
        } catch (error) {
            return res.json({ message: error })
        }
    }

    async getAll(req, res) {
        let { brandId, typeId, ordering, search, limit, page } = req.query
        console.log(`=====${search}=====`)
        page = page || 1
        limit = limit || 12
        let offset = page * limit - limit

        if (search) {
            search = search.split('-')
            search = search.join(' ')
            console.log(`=====${search}=====`)
        }


        if (brandId) {
            brandId = brandId.split('__')
        }

        let products

        if (!brandId && !typeId && !ordering && !search) {
            products = await Product.findAndCountAll({ limit, offset })
        }

        if (brandId && typeId && ordering && search) {
            if (ordering === 'cost_increase') {
                products = await Product.findAndCountAll({
                    where: {
                        name: {
                            [Op.iLike]: `%${search}%`
                        },
                        brandId: {
                            [Op.in]: brandId
                        }, typeId
                    }, limit, offset, order: [
                        ['price', 'ASC']
                    ]
                })
            }
            if (ordering === 'cost_reduction') {
                products = await Product.findAndCountAll({
                    where: {
                        name: {
                            [Op.iLike]: `%${search}%`
                        },
                        brandId: {
                            [Op.in]: brandId
                        }, typeId
                    }, limit, offset, order: [
                        ['price', 'DESC']
                    ]
                })
            }
            if (ordering === 'name_az') {
                products = await Product.findAndCountAll({
                    where: {
                        name: {
                            [Op.iLike]: `%${search}%`
                        },
                        brandId: {
                            [Op.in]: brandId
                        }, typeId
                    }, limit, offset, order: [
                        ['name', 'ASC']
                    ]
                })
            }
            if (ordering === 'name_za') {
                products = await Product.findAndCountAll({
                    where: {
                        name: {
                            [Op.iLike]: `%${search}%`
                        },
                        brandId: {
                            [Op.in]: brandId
                        }, typeId
                    }, limit, offset, order: [
                        ['name', 'DESC']
                    ]
                })
            }
        }

        if (brandId && !typeId && !ordering && !search) {
            products = await Product.findAndCountAll({
                where: {
                    brandId: {
                        [Op.in]: brandId
                    }
                }, limit, offset
            })
        }

        if (brandId && typeId && !ordering && !search) {
            products = await Product.findAndCountAll({
                where: {
                    brandId: {
                        [Op.in]: brandId
                    }, typeId
                }, limit, offset
            })
        }

        if (brandId && !typeId && ordering && !search) {
            if (ordering === 'cost_increase') {
                products = await Product.findAndCountAll({
                    where: {
                        brandId: {
                            [Op.in]: brandId
                        }
                    }, limit, offset, order: [
                        ['price', 'ASC']
                    ]
                })
            }
            if (ordering === 'cost_reduction') {
                products = await Product.findAndCountAll({
                    where: {
                        brandId: {
                            [Op.in]: brandId
                        }
                    }, limit, offset, order: [
                        ['price', 'DESC']
                    ]
                })
            }
            if (ordering === 'name_az') {
                products = await Product.findAndCountAll({
                    where: {
                        brandId: {
                            [Op.in]: brandId
                        }
                    }, limit, offset, order: [
                        ['name', 'ASC']
                    ]
                })
            }
            if (ordering === 'name_za') {
                products = await Product.findAndCountAll({
                    where: {
                        brandId: {
                            [Op.in]: brandId
                        }
                    }, limit, offset, order: [
                        ['name', 'DESC']
                    ]
                })
            }
        }

        if (brandId && !typeId && !ordering && search) {
            products = await Product.findAndCountAll({
                where: {
                    name: {
                        [Op.iLike]: `%${search}%`
                    },
                    brandId: {
                        [Op.in]: brandId
                    }
                }, limit, offset
            })
        }        

        if (brandId && typeId && ordering && !search) {
            if (ordering === 'cost_increase') {
                products = await Product.findAndCountAll({
                    where: {
                        brandId: {
                            [Op.in]: brandId
                        }, typeId
                    }, limit, offset, order: [
                        ['price', 'ASC']
                    ]
                })
            }
            if (ordering === 'cost_reduction') {
                products = await Product.findAndCountAll({
                    where: {
                        brandId: {
                            [Op.in]: brandId
                        }, typeId
                    }, limit, offset, order: [
                        ['price', 'DESC']
                    ]
                })
            }
            if (ordering === 'name_az') {
                products = await Product.findAndCountAll({
                    where: {
                        brandId: {
                            [Op.in]: brandId
                        }, typeId
                    }, limit, offset, order: [
                        ['name', 'ASC']
                    ]
                })
            }
            if (ordering === 'name_za') {
                products = await Product.findAndCountAll({
                    where: {
                        brandId: {
                            [Op.in]: brandId
                        }, typeId
                    }, limit, offset, order: [
                        ['name', 'DESC']
                    ]
                })
            }
        }

        if (!brandId && typeId && ordering && search) {
            if (ordering === 'cost_increase') {
                products = await Product.findAndCountAll({
                    where: {
                        name: {
                            [Op.iLike]: `%${search}%`
                        }, typeId
                    }, limit, offset, order: [
                        ['price', 'ASC']
                    ]
                })
            }
            if (ordering === 'cost_reduction') {
                products = await Product.findAndCountAll({
                    where: {
                        name: {
                            [Op.iLike]: `%${search}%`
                        }, typeId
                    }, limit, offset, order: [
                        ['price', 'DESC']
                    ]
                })
            }
            if (ordering === 'name_az') {
                products = await Product.findAndCountAll({
                    where: {
                        name: {
                            [Op.iLike]: `%${search}%`
                        }, typeId
                    }, limit, offset, order: [
                        ['name', 'ASC']
                    ]
                })
            }
            if (ordering === 'name_za') {
                products = await Product.findAndCountAll({
                    where: {
                        name: {
                            [Op.iLike]: `%${search}%`
                        }, typeId
                    }, limit, offset, order: [
                        ['name', 'DESC']
                    ]
                })
            }
        }

        if (brandId && !typeId && ordering && search) {
            if (ordering === 'cost_increase') {
                products = await Product.findAndCountAll({
                    where: {
                        name: {
                            [Op.iLike]: `%${search}%`
                        },
                        brandId: {
                            [Op.in]: brandId
                        }
                    }, limit, offset, order: [
                        ['price', 'ASC']
                    ]
                })
            }
            if (ordering === 'cost_reduction') {
                products = await Product.findAndCountAll({
                    where: {
                        name: {
                            [Op.iLike]: `%${search}%`
                        },
                        brandId: {
                            [Op.in]: brandId
                        }
                    }, limit, offset, order: [
                        ['price', 'DESC']
                    ]
                })
            }
            if (ordering === 'name_az') {
                products = await Product.findAndCountAll({
                    where: {
                        name: {
                            [Op.iLike]: `%${search}%`
                        },
                        brandId: {
                            [Op.in]: brandId
                        }
                    }, limit, offset, order: [
                        ['name', 'ASC']
                    ]
                })
            }
            if (ordering === 'name_za') {
                products = await Product.findAndCountAll({
                    where: {
                        name: {
                            [Op.iLike]: `%${search}%`
                        },
                        brandId: {
                            [Op.in]: brandId
                        }
                    }, limit, offset, order: [
                        ['name', 'DESC']
                    ]
                })
            }
        }

        if (brandId && typeId && !ordering && search) {
            products = await Product.findAndCountAll({
                where: {
                    name: {
                        [Op.iLike]: `%${search}%`
                    },
                    brandId: {
                        [Op.in]: brandId
                    },
                    typeId
                }, limit, offset
            })
        }

        if (!brandId && typeId && !ordering && !search) {
            products = await Product.findAndCountAll({
                where: {
                    typeId
                }, limit, offset
            })
        }

        if (!brandId && typeId && ordering && !search) {
            if (ordering === 'cost_increase') {
                products = await Product.findAndCountAll({
                    where: { typeId },
                    limit, offset, order: [
                        ['price', 'ASC']
                    ]
                })
            }
            if (ordering === 'cost_reduction') {
                products = await Product.findAndCountAll({
                    where: { typeId },
                    limit, offset, order: [
                        ['price', 'DESC']
                    ]
                })
            }
            if (ordering === 'name_az') {
                products = await Product.findAndCountAll({
                    where: { typeId },
                    limit, offset, order: [
                        ['name', 'ASC']
                    ]
                })
            }
            if (ordering === 'name_za') {
                products = await Product.findAndCountAll({
                    where: { typeId },
                    limit, offset, order: [
                        ['name', 'DESC']
                    ]
                })
            }
        }

        if (!brandId && typeId && !ordering && search) {
            products = await Product.findAndCountAll({
                where: {
                    name: {
                        [Op.iLike]: `%${search}%`
                    },
                    typeId
                }, limit, offset
            })
        }

        if (!brandId && !typeId && ordering && !search) {
            if (ordering === 'cost_increase') {
                products = await Product.findAndCountAll({
                    limit, offset, order: [
                        ['price', 'ASC']
                    ]
                })
            }
            if (ordering === 'cost_reduction') {
                products = await Product.findAndCountAll({
                    limit, offset, order: [
                        ['price', 'DESC']
                    ]
                })
            }
            if (ordering === 'name_az') {
                products = await Product.findAndCountAll({
                    limit, offset, order: [
                        ['name', 'ASC']
                    ]
                })
            }
            if (ordering === 'name_za') {
                products = await Product.findAndCountAll({
                    limit, offset, order: [
                        ['name', 'DESC']
                    ]
                })
            }
        }

        if (!brandId && !typeId && ordering && search) {
            if (ordering === 'cost_increase') {
                products = await Product.findAndCountAll({
                    where: {
                        name: {
                            [Op.iLike]: `%${search}%`
                        }
                    },
                    limit, offset, order: [
                        ['price', 'ASC']
                    ]
                })
            }
            if (ordering === 'cost_reduction') {
                products = await Product.findAndCountAll({
                    where: {
                        name: {
                            [Op.iLike]: `%${search}%`
                        }
                    },
                    limit, offset, order: [
                        ['price', 'DESC']
                    ]
                })
            }
            if (ordering === 'name_az') {
                products = await Product.findAndCountAll({
                    where: {
                        name: {
                            [Op.iLike]: `%${search}%`
                        }
                    },
                    limit, offset, order: [
                        ['name', 'ASC']
                    ]
                })
            }
            if (ordering === 'name_za') {
                products = await Product.findAndCountAll({
                    where: {
                        name: {
                            [Op.iLike]: `%${search}%`
                        }
                    },
                    limit, offset, order: [
                        ['name', 'DESC']
                    ]
                })
            }
        }

        if (!brandId && !typeId && !ordering && search) {
            products = await Product.findAndCountAll({
                where: {
                    name: {
                        [Op.iLike]: `%${search}%`
                    }
                }, limit, offset
            })
        }

        return res.json(products)
    }

    async getOne(req, res) {
        const { id } = req.params 
        const product = await Product.findOne({
            where: { id }
        })
        return res.json(product)
    }

    async getBasketProducts(req, res) {
        const { productsId } = req.body
        const products = await Product.findAll({
            include: [{ model: ProductInfo, as: 'info' }],
            where: {
                id: {
                    [Op.in]: productsId
                }
            }
        })
        return res.json(products)
    }
}
// [Op.in]: [1,2]
module.exports = new ProductController()