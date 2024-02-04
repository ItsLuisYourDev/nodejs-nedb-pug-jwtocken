const Datastore = require('nedb')
const users = new Datastore({ filename: './database/users.db', autoload: true });
const chats = new Datastore({ filename: './database/chats.db', autoload: true });
module.exports = {users,chats}
