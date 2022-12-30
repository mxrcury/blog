const uuid = require('uuid')
const bcrypt = require('bcrypt')
const pool = require("../db")
const ApiError = require("../exceptions/api-error")
const TokenService = require('./token-service')
const UserDto = require('../dto/user-dto')


class UserService {
    async register(username,email,password){
        const userExists = await pool.query(`SELECT * FROM users WHERE username = $1 OR email = $2;`,[username,email])
        if(userExists.rows[0]){
            throw ApiError.UnAuthorizated(`User with email <${email}> and username <${username}> already exists!`)
        }
        const activationLink = uuid.v4()
        const hashedPassword = await bcrypt.hash(password,6)
        const registeredUser = await pool.query(`INSERT INTO users (username,email,password,activation_link) values ($1,$2,$3,$4) RETURNING*;`,[username,email,hashedPassword,activationLink])
        if(!registeredUser.rows[0]){
            throw ApiError.BadRequest()
        }
        const user = new UserDto(registeredUser.rows[0])
        const tokens = await TokenService.generateTokens({...user})
        await TokenService.saveToken(user.id,tokens.refreshToken)

        return {
            ...tokens,
            user
        }
    }
    async login(username,email,password){
        let tokens;
        const userData = await pool.query(`SELECT * FROM users WHERE username = $1 AND email = $2`,[username, email])
        const userExists = userData.rows[0] 
        if(!userExists){
            throw ApiError.BadRequest(`User with email <${email}> and username <${username}> doesn't exists!`)
        }
        console.log(userData.rows[0]);
        const isValidPass = await bcrypt.compare(password, userData.rows[0].password)
        if(!isValidPass){
            throw ApiError.BadRequest(`Wrong password`)
        }
        const user = new UserDto(userData.rows[0])
        const userRefreshToken = await pool.query(`SELECT * FROM tokens WHERE user_id = $1`,[user.id])
        const isRefreshTokenValid = TokenService.validateRefreshToken(userRefreshToken.rows[0].refresh_token)
        
        if(!isRefreshTokenValid){
            tokens = await TokenService.generateTokens({...user})
        }
        if(isRefreshTokenValid){
            const accessToken = await TokenService.generateAccessToken({...user})
            tokens = {accessToken,refreshToken:userRefreshToken.rows[0].refresh_token}
        }
        return {
            ...tokens,
            user
        }
    }
    async logout(refreshToken){
        // delete if token during logout is expired
        const tokenFromDb = await pool.query(`SELECT * FROM tokens WHERE refresh_token = $1;`,[refreshToken])
        const isTokenValid = TokenService.validateRefreshToken(tokenFromDb.rows[0].refresh_token)
        if(!isTokenValid){
            await pool.query(`DELETE FROM tokens WHERE refresh_token = $1`,[tokenFromDb.rows[0].refresh_token])
        }
        return;
    }
    async refresh(refreshToken){
        let tokens = {}
        const refreshTokenFromDb = await TokenService.findToken(refreshToken)
        if(!refreshTokenFromDb){
            throw ApiError.BadRequest(`Such token was found`)
        }
        const isRefreshTokenValid = TokenService.validateRefreshToken(refreshTokenFromDb.refresh_token)
        const userData = isRefreshTokenValid
        const user = new UserDto(userData)
        if(!isRefreshTokenValid){
            tokens = await TokenService.generateTokens({...user}) 
            return tokens
        }
        const accessToken = TokenService.generateAccessToken({...user})
        tokens = {accessToken,refreshToken:refreshTokenFromDb.refresh_token}        
        return tokens
    }
    async getUsers(page) {
        const rowsNumber = 5
        const users = await pool.query(`SELECT * FROM users ORDER BY id DESC OFFSET ($1 - 1)*$2 FETCH NEXT $3 ROWS ONLY;`,[page,rowsNumber,rowsNumber])
        const usersCounts = await pool.query(`SELECT * FROM users;`)
        return {results:users.rows,totalCounts:usersCounts.rows.length}
    }
    async getOneUser(userId) {
        const userData = await pool.query(`SELECT * FROM users WHERE id = $1`,[userId])
        const user = new UserDto({...userData.rows[0]})
        delete user.password
        delete user.activationLink

        return user
    }
}

module.exports = new UserService()