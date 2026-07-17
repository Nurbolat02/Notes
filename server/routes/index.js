const { Router } = require("express");// импортировать express.Router()
const userRouter = require('../routes/userRouter')// импортировать userRouter из ./userRouter
const noteRouter = require('../routes/noteRouter')// импортировать noteRouter из ./noteRouter
const router = Router();
// router.use('/user', userRouter)
// router.use('/note', noteRouter)
router.use('/user', userRouter);
router.use('/note', noteRouter)

module.exports = router
// экспортировать router
