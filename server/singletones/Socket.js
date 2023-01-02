const socketServer = require("socket.io");
require("dotenv").config();

class SocketSingleton {
    io;
    constructor() {
        this.io = null       
    }
    configure(server) {
        this.io = socketServer(server, {
            cors:{
                origin:'http://localhost:3000',
                methods:["GET", "POST", "DELETE", "PUT"]
            }
        })
        return this
    }
}

module.exports = new SocketSingleton()