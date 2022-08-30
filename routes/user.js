const {Router} = require('express')
const controllerUser = require('../controllers/users')
const validator = require('../helpers/db_validator')

const router = Router()

router.get('/', controllerUser.usuariosGet)


router.post('/',controllerUser.usuariosPost)


module.exports = router