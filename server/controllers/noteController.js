const ApiError = require('../error/ApiError') // импортировать ApiError
const { Note, User } = require('../models/models') // импортировать { Note, User } из ../models/models

// class NoteController:
class NoteController {
	async create(req, res, next) {
		// ← добавили next в параметры
		const { title, text } = req.body
		if (!title || !text) {
			return next(ApiError.badRequest('У заметки должны присустовать Заголовок и Текст'))
		}
		const note = await Note.create({
			title,
			text,
			userId: req.user.id
		})
		res.json(note)
	}
	//   async create(req, res, next):
	//     - достать title, text из req.body
	//     - если нет title — next(ApiError.badRequest(...)), return
	//     - если нет text — next(ApiError.badRequest(...)), return
	//     - Note.create({ title, text, userId: req.user.id }) — привязать к текущему юзеру (req.user кладёт authMiddleware)
	//     - res.json(note)
	async getAll(req, res) {
		const notes = await Note.findAll({
			include: { model: User, attributes: ['email'] }
		})
		res.json(notes)
	}
	//   async getAll(req, res, next):
	//     - Note.findAll(), присоединяя email автора через include: User
	//     - res.json(notes)

	async getMy(req, res) {
		const notes = await Note.findAll({
			where: { userId: req.user.id }
		})
		res.json(notes)
	}
	//   async getMy(req, res, next):
	//     - Note.findAll({ where: { userId: req.user.id } }) — только заметки текущего юзера
	//     - res.json(notes)
	async getOne(req, res, next) {
		const { id } = req.params
		const note = await Note.findByPk(id)
		if (!note) {
			return next(ApiError.badRequest('Не удалось найти данную заметку'))
		}
		res.json(note)
	}
	//     - достать id из req.params
	//     - Note.findByPk(id)
	//     - если не найдена — next(ApiError.badRequest(...)), return
	//     - res.json(note)
	async update(req, res, next) {
		const { id } = req.params
		const { text, title } = req.body
		const note = await Note.findByPk(id)
		if (!note) {
			return next(ApiError.badRequest('Не удалось найти данную заметку'))
		}
		if (note.userId !== req.user.id && req.user.role !== 'ADMIN') {
			return next(ApiError.forbidden('Вы не можете редактировать данную заметку'))
		}
		await note.update({
			title,
			text
		})
		res.json(note)
	}
	//   async update(req, res, next):
	//     - достать id из req.params, title/text из req.body
	//     - Note.findByPk(id)
	//     - если не найдена — next(ApiError.badRequest(...)), return
	//     - если note.userId !== req.user.id И req.user.role !== 'ADMIN' — next(ApiError.forbidden(...)), return
	//     - note.update({ title, text })
	//     - res.json(note)
	async delete(req, res, next) {
		const { id } = req.params
		const note = await Note.findByPk(id)
		if (!note) {
			return next(ApiError.badRequest('Не удалось найти данную заметку'))
		}
		if (note.userId !== req.user.id && req.user.role !== 'ADMIN') {
			return next(ApiError.forbidden('Вы не можете удалить данную заметку'))
		}
		await note.destroy()
		res.json({ message: 'Заметка удалена' })
	}
	//   async delete(req, res, next):
	//     - достать id из req.params
	//     - Note.findByPk(id)
	//     - если не найдена — next(ApiError.badRequest(...)), return
	//     - если note.userId !== req.user.id И req.user.role !== 'ADMIN' — next(ApiError.forbidden(...)), return
	//     - note.destroy()
	//     - res.json({ message: 'Заметка удалена' })
}
module.exports = new NoteController()
//   async create(req, res, next):
//     - достать title, text из req.body
//     - если нет title — next(ApiError.badRequest(...)), return
//     - если нет text — next(ApiError.badRequest(...)), return
//     - Note.create({ title, text, userId: req.user.id }) — привязать к текущему юзеру (req.user кладёт authMiddleware)
//     - res.json(note)

//   async getAll(req, res, next):
//     - Note.findAll()
//     - res.json(notes)

//   async getOne(req, res, next):
//     - достать id из req.params
//     - Note.findByPk(id)
//     - если не найдена — next(ApiError.badRequest(...)), return
//     - res.json(note)

//   async update(req, res, next):
//     - достать id из req.params, title/text из req.body
//     - Note.findByPk(id)
//     - если не найдена — next(ApiError.badRequest(...)), return
//     - если note.userId !== req.user.id И req.user.role !== 'ADMIN' — next(ApiError.forbidden(...)), return
//     - note.update({ title, text })
//     - res.json(note)

//   async delete(req, res, next):
//     - достать id из req.params
//     - Note.findByPk(id)
//     - если не найдена — next(ApiError.badRequest(...)), return
//     - если note.userId !== req.user.id И req.user.role !== 'ADMIN' — next(ApiError.forbidden(...)), return
//     - note.destroy()
//     - res.json({ message: 'Заметка удалена' })

// экспортировать new NoteController()
