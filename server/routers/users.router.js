const Router = require('express')
const userService = require('../services/user-service')
const UserController = require('../controllers/user-controller')


const usersRouter = new Router()


usersRouter.get('',UserController.getUsers)
usersRouter.get('/:id',UserController.getOneUser)

module.exports = usersRouter