const bcrypt = require('bcryptjs') // импортировать bcryptjs
const ApiError = require('../error/ApiError') // импортировать ApiError
const { User } = require('../models/models') // импортировать { User } из ../models/models

// вспомогательная функция toSafeUser(user) — вернуть { id, email, role } без пароля
function toSafeUser(user) {
	// вспомогательная функция: убирает пароль перед отправкой юзера клиенту
	return { id: user.id, email: user.email, role: user.role }
}
class UserController {
	async registration(req, res, next) {
		// ← добавили next в параметры
		const { email, password } = req.body
		if (!email || !password) {
			return next(ApiError.badRequest('Введите пароль и логин'))
		}
		if (await User.findOne({ where: { email } })) {
			return next(ApiError.badRequest('Данный логи уже занят'))
		}
		const hashPassword = await bcrypt.hash(password, 5)
		const user = await User.create({
			email,
			password: hashPassword
		})
		req.session.userId = user.id
		req.session.role = user.role
		res.json(toSafeUser(user))
	}
	//   async registration(req, res, next):
	//     - достать email, password из req.body (role НЕ брать из body — всегда 'USER')
	//     - если нет email или password — next(ApiError.badRequest(...)), return
	//     - User.findOne({ where: { email } }) — проверить, нет ли уже такого юзера
	//     - если есть — next(ApiError.badRequest(...)), return
	//     - bcrypt.hash(password, 5) — захешировать пароль
	//     - User.create({ email, password: hash, role: 'USER' })
	//     - положить в сессию: req.session.userId = user.id, req.session.role = user.role
	//     - res.json(toSafeUser(user))
	async login(req, res, next) {
		const { email, password } = req.body
		if (!email || !password) {
			return next(ApiError.badRequest('Введите пароль и логин'))
		}
		const user = await User.findOne({ where: { email } })
		if (!user) {
			return next(ApiError.badRequest('Такого пользователя не существует'))
		}
		const isPasswordCorrect = await bcrypt.compare(password, user.password)
		if (!isPasswordCorrect) {
			return next(ApiError.unauthorized('Неправильный пароль или логин'))
		}
		req.session.userId = user.id
		req.session.role = user.role
		res.json(toSafeUser(user))
	}
	//   async login(req, res, next):
	//     - достать email, password из req.body
	//     - если нет email или password — next(ApiError.badRequest(...)), return
	//     - User.findOne({ where: { email } })
	//     - если не найден — next(ApiError.unauthorized(...)), return
	//     - bcrypt.compare(password, user.password) — сравнить с хешем
	//     - если не совпал — next(ApiError.unauthorized(...)), return
	//     - положить в сессию: req.session.userId, req.session.role
	//     - res.json(toSafeUser(user))
	async logout(req, res, next) {
		req.session.destroy((error) => {
			if (error) {
				return next(ApiError.internal('Не удалось выйти из аккаунта'))
			}
			res.clearCookie('connect.sid')
			res.json({ message: 'Вы вышли из аккаунта' })
		})
	}
	//   async logout(req, res, next):
	//     - req.session.destroy(callback)
	//     - в callback: если err — next(ApiError.internal(...))
	//     - иначе res.clearCookie('connect.sid') и res.json({ message: ... })

	async check(req, res, next) {
		const user = await User.findByPk(req.user.id)
		if (!user) {
			return next(ApiError.unauthorized('Вы не авторизованы'))
		}
		res.json(toSafeUser(user))
	}
	//   async check(req, res, next):
	//     - User.findByPk(req.user.id) — req.user кладёт authMiddleware
	//     - если не найден — next(ApiError.unauthorized(...)), return
	//     - res.json(toSafeUser(user))
}
module.exports = new UserController()

// class UserController:

//   async registration(req, res, next):
//     - достать email, password из req.body (role НЕ брать из body — всегда 'USER')
//     - если нет email или password — next(ApiError.badRequest(...)), return
//     - User.findOne({ where: { email } }) — проверить, нет ли уже такого юзера
//     - если есть — next(ApiError.badRequest(...)), return
//     - bcrypt.hash(password, 5) — захешировать пароль
//     - User.create({ email, password: hash, role: 'USER' })
//     - положить в сессию: req.session.userId = user.id, req.session.role = user.role
//     - res.json(toSafeUser(user))

//   async login(req, res, next):
//     - достать email, password из req.body
//     - если нет email или password — next(ApiError.badRequest(...)), return
//     - User.findOne({ where: { email } })
//     - если не найден — next(ApiError.unauthorized(...)), return
//     - bcrypt.compare(password, user.password) — сравнить с хешем
//     - если не совпал — next(ApiError.unauthorized(...)), return
//     - положить в сессию: req.session.userId, req.session.role
//     - res.json(toSafeUser(user))

//   async logout(req, res, next):
//     - req.session.destroy(callback)
//     - в callback: если err — next(ApiError.internal(...))
//     - иначе res.clearCookie('connect.sid') и res.json({ message: ... })

//   async check(req, res, next):
//     - User.findByPk(req.user.id) — req.user кладёт authMiddleware
//     - если не найден — next(ApiError.unauthorized(...)), return
//     - res.json(toSafeUser(user))

// экспортировать new UserController()
