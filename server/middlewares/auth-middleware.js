const UserDto = require("../dto/user-dto");
const ApiError = require("../exceptions/api-error");
const TokenService = require("../services/token-service");

module.exports = (req, res, next) => {
    let token = "";
    if (!req.headers.authorization) {
        throw ApiError.UnAuthorizated();
    }
    token = req.headers.authorization.split(" ")[1];
    const isTokenValid = TokenService.validateAccessToken(token);
    if (!isTokenValid) {
        throw ApiError.UnAuthorizated();
    }
    const user = new UserDto(isTokenValid);
    req.user = user;
    next();
};
