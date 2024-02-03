
const {Router} = require('express');
const router = Router();
const methodsDB = require('../controllers/users')
router.get('/',methodsDB.getUsers)
router.get('/:id',methodsDB.getUserId)
router.post('/',methodsDB.insertUser)
router.delete('/:id',methodsDB.deleteId)
// / deleted all or [1,2,3] deleted filter
router.delete('/',methodsDB.deleteAll)
router.put('/:id',methodsDB.updateId)
module.exports = router;
