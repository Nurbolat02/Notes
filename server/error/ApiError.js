// класс ApiError, наследуется от встроенного Error
class ApiError extends Error {
    constructor(status, message){
        super()
        this.message = message
        this.status = status
    }

    static badRequest(message){
        return new ApiError(400,message)
    }
    static internal(message){
        return new ApiError(500,message)
    }
    static unauthorized(message){
        return new ApiError(401,message)
    }
    static forbidden(message){
        return new ApiError(403,message)
    }
}
module.exports = ApiError
// constructor(status, message):
//   - вызвать super()
//   - this.status = status
//   - this.message = message

// static badRequest(message) — return new ApiError(400, message)
// static internal(message) — return new ApiError(500, message)
// static unauthorized(message) — return new ApiError(401, message)
// static forbidden(message) — return new ApiError(403, message)

// экспортировать класс ApiError
