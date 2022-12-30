const Router = require('express')
const authRouter = require('./auth.router')
const postRouter = require('./posts.router')
const authMiddleware = require('../middlewares/auth-middleware')
const usersRouter = require('./users.router')

const rootRouter = new Router()


rootRouter.use('/auth',authRouter)
rootRouter.use('/posts', authMiddleware ,postRouter)
rootRouter.use('/users',authMiddleware,usersRouter)


module.exports = rootRouter