const { User, Basket } = require('../models/models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const uuid = require('uuid')
const path = require('path')

class UserController {
    async registration(req, res) {
        const { email, password, first_name, surname, role="USER" } = req.body
        if (!email || !password) {
            return res.json({ message: 'Некорректный email или password' })
        }
        if (!first_name || !surname) {
            return res.json({ message: 'Не указано Имя или Фамилия' })
        }
        const candidate = await User.findOne({ where: { email } })
        if (candidate) {
            return res.json({ message: 'Пользователь с такой почтой уже существует' })
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({ email, password: hashPassword, first_name, surname, role })
        const basket = await Basket.create({ userId: user.id })
        const token = jwt.sign({ id: user.id, email: user.email, first_name: user.first_name, surname: user.surname, role: user.role, phone: user.phone_number, image: user.image }, process.env.SECRET_KEY, { expiresIn: '24h' })
        return res.json({ token })
    }

    async login(req, res) {
        const { email, password } = req.body
        console.log('login controller')
        console.log(email);
        console.log(password);
        const user = await User.findOne({ where: { email } })
        if (!user) {
            return res.json({ message: 'Пользователь не найден' })
        }
        console.log(user.first_name);
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return res.json({ message: 'Неверный пароль' })
        }
        const token = jwt.sign({ id: user.id, email: user.email, first_name: user.first_name, surname: user.surname, role: user.role, phone: user.phone_number, image: user.image }, process.env.SECRET_KEY, { expiresIn: '24h' })
        return res.json({ token })
    }

    async check(req, res) {
        const token = jwt.sign({ id: req.user.id, email: req.user.email, first_name: req.user.first_name, surname: req.user.surname, role: req.user.role, phone: req.user.phone, image: req.user.image }, process.env.SECRET_KEY, { expiresIn: '24h' })
        return res.json({ token })
    }

    async change(req, res) {
        const { email, prev_email, phone_number, first_name, surname } = req.body
        let fileName
        if (req.files) {
            fileName = uuid.v4() + '.jpg'
            const { image } = req.files
            image.mv(path.resolve(__dirname, '..', 'static', fileName))
        }        
        await User.update({ first_name: first_name, surname: surname, email: email, image: fileName, phone_number: phone_number },
            { where: { email: prev_email } })
        const user = await User.findOne({ where: { email } })
        const token = jwt.sign({ id: user.id, email: user.email, first_name: user.first_name, surname: user.surname, role: user.role, phone: user.phone_number, image: user.image }, process.env.SECRET_KEY, { expiresIn: '24h' })
        return res.json({ token })
    }
}

module.exports = new UserController()