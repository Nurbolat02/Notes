const ApiError = require('../error/ApiError') // импортировать ApiError

// экспортировать функцию (req, res, next):
//   - если нет req.session.userId — вызвать next(ApiError.unauthorized(...)) и return
//   - иначе положить в req.user = { id: req.session.userId, role: req.session.role }
//   - вызвать next()
module.exports = async function (req, res, next) {
	if (!req.session.userId) {
		return next(ApiError.unauthorized('Вы не авторизованы'))
	}
	req.user = { id: req.session.userId, role: req.session.role }
	return next()
}
