const { Router } = require('express') // импортировать express.Router()
const userController = require('../controllers/userController') // импортировать userController
const authMiddleware = require('../middleware/authMiddleware') // импортировать authMiddleware
const router = new Router()
router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/check', authMiddleware, userController.check) // — только для залогиненных

// экспортировать router
module.exports = router
