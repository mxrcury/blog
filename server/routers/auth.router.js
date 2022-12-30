const Router = require('express')
const UserController = require('../controllers/user-controller')


const authRouter = new Router()

authRouter.post('/register',UserController.register)
authRouter.post('/login',UserController.login)
authRouter.get('/logout',UserController.logout)
authRouter.get('/refresh',UserController.refresh)

module.exports = authRouter