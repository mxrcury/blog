

class ApiError extends Error{
    status;
    message;
    errors;
    constructor(status,message,errors = []){
        super(message)
        this.message = message
        this.status = status
        this.errors = errors
    }
    static UnAuthorizated(message = 'Oops!You are not authorizated'){
        return new ApiError(401,message)
    }
    static BadRequest(message = 'Something went wrong',errors = []) {
        return new ApiError(500,message,errors)
    }
}

module.exports = ApiError