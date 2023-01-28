import { AnyAction, Dispatch, Middleware } from "@reduxjs/toolkit";
import { Socket, io } from "socket.io-client";
import { updatePosts } from "../slices/post";
import { ResponsePost } from "../slices/post.interface";
import { RootState } from "../store";
import { EventCallback, NextMiddleware } from "./types";


class SocketMiddleware {
  private _socket: Socket | null = null;
  private _dispatch: Dispatch<AnyAction> | null = null;
  private _nextMiddleware: NextMiddleware | null = null;
  private _actionsPrefix: string = "WEBSOCKET";
  events: string[] = [];
  connect(url: string): void {
    if (!this._socket) {
      this._socket = io(url, { transports: ["websocket", "polling"], withCredentials: true });
      this.processConnectEvent();
      this.processDisconnectEvent();
    }
  }
  disconnect(): void {
    if (this.isSocketInit()) {
      this.events.forEach((event) => this._socket?.off(event));
      this._socket?.on("disconnect", () => {
        console.log("User has been disconnected - x");
      });
    }
  }
  event(eventName: string, eventCallback: EventCallback) {
    if (this.isSocketInit()) {
      if (!this.hasEvent(eventName)) {
        this.events.push(eventName);
        this.processEvent({ eventName, eventCallback });
      }
    }
  }
  send(eventName: string, data: any) {
    this._socket?.emit(eventName, data);
  }
  connectMiddleware(prefix: string = "WEBSOCKET"): Middleware {
    return (store) => {
      this._dispatch = store.dispatch;
      return (next) => (action) => {
        this.validateNewPrefix(prefix);
        if (this.isSocketAction(action.type)) {
          this.catchSocketAction({ action, next });
        }
        return next(action);
      };
    };
  }
  private processEvent(eventOptions: { eventName: string; eventCallback: EventCallback }) {
    const { eventName, eventCallback } = eventOptions;
    this._socket?.on(eventName, (data: any) => {
      if (this._dispatch && this.hasEvent(eventName)) {
        eventCallback(data, this._dispatch);
      }
    });
  }
  private processConnectEvent() {
    this._socket?.on("connect", () => {
      console.log(`User has been connected to socket - v`);
    });
  }
  private processDisconnectEvent() {
    this._socket?.on("disconnect", () => {
      console.log(`User was disconnected`);
      this.events.forEach((event) => this._socket?.off(event));
    });
  }
  private catchSocketAction(middlewareOptions: { action: AnyAction; next: NextMiddleware }) {
    const { action, next } = middlewareOptions;
    this.next = next;
    this.handleSocketAction(action);
  }
  private handleSocketAction(action: any) {
    if (this._nextMiddleware) {
      return this._nextMiddleware({ ...action, socket: this._socket });
    }
  }
  private isSocketAction(type: string): boolean {
    return this.isSocketInit() && type !== undefined && this.isSocketType(type);
  }
  private isSocketType(type: string): boolean {
    return type.startsWith(this._actionsPrefix);
  }
  isSocketInit(): boolean {
    return !!this._socket;
  }
  private hasEvent(eventName: string): boolean {
    return this.events.includes(eventName);
  }
  private validateNewPrefix(prefix: string) {
    if (prefix) {
      this.actionsPrefix = prefix;
    }
  }
  set actionsPrefix(value: string) {
    this._actionsPrefix = value;
  }
  get actionsPrefix(): string {
    return this._actionsPrefix;
  }
  set next(value: NextMiddleware) {
    this._nextMiddleware = value;
  }
}

const socketCL = new SocketMiddleware();

console.log(socketCL);
// @ts-ignore
window.socketCL = socketCL;

export { socketCL };
// export const { connect, event, disconnect } = socketCL
export default socketCL.connectMiddleware;
