const db = require('../database/db')
const methodsDB = {}

//127.0.0.1:3000/api/users
methodsDB.getUsers = async (req, res) => {
    await db.find({}, (err, data) => {
        if (err) {
            res.json({ success: false, err: err })
        } else {
            res.json({ success: true, data: data })
        }
    })
}

//127.0.0.1:3000/api/users/1233435125
methodsDB.getUserId = async (req, res) => {
    const userId = req.params.id;
    await db.find({ _id: userId }, (err, user) => {
        if (err) {
            res.json({ success: false, err: err });
        } else {
            if (user.length === 0) {
                // No se encontró ningún usuario con el _id proporcionado
                res.json({ success: false, message: 'not find register' });
            } else {
                res.json({ success: true, data: user });
            }
        }
    });
};

//127.0.0.1:3000/api/users
methodsDB.insertUser = async (req, res) => {
    const { nombre, edad } = req.body
    const user = {
        nombre: nombre,
        edad: edad
    }
    await db.insert(user, (err, user) => {
        if (err) {
            res.json({ success: true, message: "Not insert register" })
        } else {
            console.log(user)
            res.json({ success: true, data: user })
        }
    })
}

//127.0.0.1:3000/api/users
methodsDB.deleteId = async (req, res) => {
    // esto es 
    const userId = req.params.id;
    await db.remove({ _id: userId }, (err, numREmove) => {
        if (err) {
            res.json({ success: false, message: "Not deleted register" })
        } else {
            res.json({ success: true, message: `Deleted ${numREmove} whit id ${userId}` })
        }
    })
}

//127.0.0.1:3000/api/users
methodsDB.deleteAll = async (req, res) => {
    const ids = req.body.ids
    console.log(req.body)
    // si no eciste una lista
    // borra todos los datos 
    if (!req.body.ids || !Array.isArray(req.body.ids)) {
        await db.remove({}, { multi: true }, (err, numRemove) => {
            if (err) {
                res.json({ success: false, message: "Not deleted register" })
            } else {
                return res.json({ success: true, message: `Se eliminaron ${numRemove} registros` })
            }
        })
        // en caso de ir una lista
        // borra los datos en una lista 
    } else {
        await db.remove({ _id: { $in: ids } }, { multi: true }, (err, numRemove) => {
            if (err) {
                res.json({ success: false, message: `Not deleted register` })
            } else {
                res.json({ success: true, message: `is deleted ${numRemove} register` })
            }
        })
    }
}
methodsDB.updateId = async (req, res) => {
    const userId = req.params.id;
    const newData = req.body;

    // Utilizando la palabra clave `await` para esperar a que la operación asíncrona se complete
    await db.update({ _id: userId }, { $set: newData }, {}, (err, numUpdated) => {
        if (err) {
            // Si hay un error, imprímelo en la consola
            console.log(err);
            return res.status(500).json({ success: false, message: 'Error al actualizar el usuario.' });
        } else {
            if (numUpdated > 0) {
                // Si al menos un registro fue actualizado, devuelve una respuesta de éxito
                return res.json({ success: true, message: `Se actualizó el usuario con ID ${userId}` });
            } else {
                // Si numUpdated es igual a cero, significa que no se encontró ningún registro que coincidiera con el criterio
                return res.status(404).json({ success: false, message: `No se encontró ningún usuario con ID ${userId}` });
            }
        }
    });
};


module.exports = methodsDB