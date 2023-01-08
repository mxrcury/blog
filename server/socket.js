
class Socket {
    socket;
    connect(socketServer) {
        socketServer.io.on("connection", (socket) => {
            this.socket = socket
            // Update posts event
            this.updatePosts()
        });
    }
    updatePosts() {
        this.socket.on("updatePosts",(data)=>{
            // Some moves with updatePosts event
        })
    }
}

module.exports = new Socket