const metodosBd = {}
const db = require('../database/db')

metodosBd.getChats = async(req, res) => {
    await db.chats.find({}, (err, datos) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.json(datos)
        }
    })
}

metodosBd.getChatsId = async (req, res) => {
    const userId = req.params.id;
    await db.chats.findOne({ _id: userId }, (err, user) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(user);
        }
    });
}

metodosBd.insertChat = async(req, res) => {
    const data = {
        categoria: req.body.categoria,
        contenido: []
    }
    await db.chats.insert(data, (err, user) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(user);
        }
    });
}

metodosBd.deletedChatId = async(req, res) => {
    const userId = req.params.id;
    await db.chats.remove({ _id: userId }, {}, (err, numRemoved) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json({ message: `Usuario eliminado: ${numRemoved} registros eliminados` });
        }
    });
}

metodosBd.deleteAllChats = async(req, res) => {
    await db.chats.remove({}, { multi: true }, (err, numRemoved) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json({ message: `Todos los usuarios eliminados: ${numRemoved} registros eliminados` });
        }
    });
};

metodosBd.updateChatId = async(req, res) => {
    const userId = req.params.id;
    const dataTxt = req.body.dataTxt;

    await db.chats.findOne({ _id: userId }, (err, chat) => {
        if (err) {
            return res.status(500).send({ success: false, error: err });
        }
        if (!chat) {
            return res.status(404).send({ success: false, message: 'Usuario no encontrado' });
        }
        // Actualizar el contenido del chat
        chat.contenido.push(dataTxt);
        // Actualizar el chat en la base de datos
        db.chats.update({ _id: userId }, { $set: chat }, {}, (updateErr, numReplaced) => {
            if (updateErr) {
                return res.status(500).send({ success: false, error: updateErr });
            }
            res.json({ success: true, message: `Usuario actualizado: ${numReplaced} registros modificados` });
        });
    });
};

module.exports = metodosBd;