const Router = require('express')
const PostController = require('../controllers/post-controller')

const router = new Router()


router.get('',PostController.getAll)
router.post('',PostController.create)
router.get('/:id',PostController.getOne)
router.delete('/:id',PostController.delete)
router.post('/comment',PostController.addComment)
router.post('/like/:id',PostController.likePost)


module.exports = router