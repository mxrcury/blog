const PostService = require("./services/post-service");
const socketSingleton = require("./singletones/Socket");

class Socket {
    _socketServer;
    _socket;
    constructor() {
        this._socket = null;
    }
    connect(server) {
        this._socketServer = socketSingleton.configure(server).io;
        this._socketServer.on("connection", async (socket) => {
            this._socket = socket;
            this.sendMessage();
            this.updatePosts();
            console.log(
                `${socket.id} from ${socket.handshake.headers.origin} at ${new Date(
                    socket.handshake.time
                ).toLocaleTimeString()}`
            );
        });
    }
    updatePosts() {
        this._socket.on("updatePosts", async (data) => {
            const { createdPost } = await PostService.createPost(data);
            console.log(`New post in socket - `, createdPost);
            await this._socketServer.emit("updatePosts", createdPost);
        });
    }
    getMessages() {
        // this._socket.
    }
    sendMessage() {
        this._socket.on("sendMessage", async (data) => {
            await this._socketServer.emit("sendMessage", data);
        });
    }
}
module.exports = new Socket();
