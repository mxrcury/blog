import { Socket } from "socket.io-client";

class SocketService implements ISocketService {
  private _socketServer: Socket | null = null;

  get socketServer(): typeof this._socketServer {
    return this._socketServer;
  }
  set socketServer(value: typeof this._socketServer) {
    this._socketServer = value;
  }
}

interface ISocketService { }
