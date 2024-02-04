const { Router } = require("express")
const router = Router()
const metodosDB = require('../controllers/chats')

//! rutas para controlar la chpt 
router.post("/",metodosDB.insertChat)
router.get("/",metodosDB.getChats)
router.get("/:id",metodosDB.getChatsId)
router.delete("/:id",metodosDB.deletedChatId)
router.put("/:id",metodosDB.updateChatId)
router.delete("/reg/all",metodosDB.deleteAllChats)

module.exports = router;