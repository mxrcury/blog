const ApiError = require("../exceptions/api-error")

module.exports = (err,req,res,next) => {
    if(err instanceof ApiError) {
        res.status(err.status).json({message:err.message,errors:err.errors})
        return;
    }
    res.status(500).json({message:`Something went wrong`,err:err.message})
    return;
}