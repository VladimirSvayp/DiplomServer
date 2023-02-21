const sequelize = require('../db')
const { DataTypes } = require('sequelize')
const path = require('path')

const User = sequelize.define('users', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    first_name: { type: DataTypes.STRING, allowNull: false },
    surname: { type: DataTypes.STRING, allowNull: false },
    phone_number: { type: DataTypes.BIGINT, unique: true, allowNull: true },
    image: { type: DataTypes.STRING, defaultValue: 'no_avatar.png' },
    role: { type: DataTypes.STRING, defaultValue: "USER" },
})

// User.sync() //создает таблицу при отсутствии, существующая останется неизменной
// User.sync({ alter: true }) //приводит таблицу в соответствие с моделью
// User.sync({ force: true }) //удаляет существующую таблицу и создает новую
// console.log('All good')

const Basket = sequelize.define('baskets', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
})

// Basket.sync({ alter: true }) //приводит таблицу в соответствие с моделью

const BasketProduct = sequelize.define('basket_products', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    count: { type: DataTypes.INTEGER, defaultValue: 1 }
})

// BasketProduct.sync({ alter: true }) //приводит таблицу в соответствие с моделью

const Product = sequelize.define('products', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    image: { type: DataTypes.STRING, defaultValue: 'no-product-image.png' },
    count: { type: DataTypes.INTEGER, defaultValue: 1 }
})
// Product.sync() //создает таблицу при отсутствии, существующая останется неизменной
// Product.sync({ alter: true }) //приводит таблицу в соответствие с моделью
// Product.sync({ force: true }) //удаляет существующую таблицу и создает новую

const Type = sequelize.define('types', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false }
})

// Type.sync({ alter: true }) //приводит таблицу в соответствие с моделью

const Brand = sequelize.define('brands', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false }
})

// Brand.sync({ alter: true }) //приводит таблицу в соответствие с моделью

const ProductInfo = sequelize.define('product_infos', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false }
})

// ProductInfo.sync({ alter: true }) //приводит таблицу в соответствие с моделью

const Comment = sequelize.define('comments', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    text: { type: DataTypes.STRING, allowNull: false }
})

// Comment.sync({ alter: true }) //приводит таблицу в соответствие с моделью

const Blog = sequelize.define('blogs', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, unique: true, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: false },
})

// Blog.sync({ alter: true }) //приводит таблицу в соответствие с моделью

const Orders = sequelize.define('orders', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    status: { type: DataTypes.STRING, defaultValue: "CREATED" }
})

// Orders.sync({ alter: true }) //приводит таблицу в соответствие с моделью

const TypeBrand = sequelize.define('type_brand', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
})

// TypeBrand.sync({ alter: true }) //приводит таблицу в соответствие с моделью

User.hasOne(Basket)
Basket.belongsTo(User)

User.hasMany(Orders)
Orders.belongsTo(User)

User.hasMany(Comment)
Comment.belongsTo(User)

Basket.hasMany(BasketProduct)
BasketProduct.belongsTo(Basket)

Type.hasMany(Product)
Product.belongsTo(Type)

Brand.hasMany(Product)
Product.belongsTo(Brand)

Type.belongsToMany(Brand, { through: TypeBrand })
Brand.belongsToMany(Type, { through: TypeBrand })

Product.hasMany(ProductInfo, { as: 'info' })
ProductInfo.belongsTo(Product)

Product.hasMany(BasketProduct)
BasketProduct.belongsTo(Product)

module.exports = {
    User,
    Basket,
    BasketProduct,
    Product,
    Type,
    Brand,
    ProductInfo,
    Comment,
    Blog,
    Orders,
    TypeBrand
}
