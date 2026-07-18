const { Router } = require('express') // импортировать express.Router()
const noteController = require('../controllers/noteController') // импортировать noteController
const authMiddleware = require('../middleware/authMiddleware') // импортировать authMiddleware
const router = new Router()

router.post('/', authMiddleware, noteController.create)
//  — создать заметку, только для залогиненных
router.get('/', noteController.getAll)
// — получить все заметки, доступно всем
router.get('/my', authMiddleware, noteController.getMy)
// — получить только заметки текущего юзера, только для залогиненных
// ВАЖНО: этот роут должен идти ДО '/:id', иначе Express примет 'my' за значение id
router.get('/:id', noteController.getOne)
// — получить одну заметку по id, доступно всем
router.put('/:id', authMiddleware, noteController.update)
// — изменить заметку, только для залогиненных
router.delete('/:id', authMiddleware, noteController.delete)
// — удалить заметку, только для залогиненных

// экспортировать router
module.exports = router
