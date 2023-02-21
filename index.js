require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./routes')
const path = require('path')
const sequelize = require('./db')
const fileUpLoad = require('express-fileupload')

const PORT = process.env.PORT || 7000

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'static')))
app.use(fileUpLoad({}))
app.use('/api', router)

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => {
            console.log(`Server is running on port: ${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()
