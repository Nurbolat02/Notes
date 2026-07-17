const ApiError =  require("../error/ApiError");// импортировать ApiError

module.exports = function(err,req,res,next){
    if(err instanceof ApiError){
        return res.status(err.status).json({ message: err.message })
    }
    console.log(err)
    return res.status(500).json({ message: 'Непредвиденная ошибка сервера' })
}
// экспортировать функцию с 4 аргументами (err, req, res, next) — именно 4, это сигнал Express'у "это обработчик ошибок"
//   - если err instanceof ApiError — res.status(err.status).json({ message: err.message })
//   - иначе — console.log(err) и res.status(500).json({ message: 'Непредвиденная ошибка сервера' })
