import { Server, type Socket } from "socket.io";
import { Comment } from "../types/youtube.js";

export class SocketService {
  private _io: Server;
  private _sockets: { [key: string]: Socket } = {};
  constructor() {
    console.log("Init Socket Service...");
    this._io = new Server({
      cors: {
        allowedHeaders: "[*]",
        origin: "*",
      },
    });
  }
  public initListener() {
    const io = this._io;
    console.log("Init Socket listener...");
    io.on("connect", (socket) => {
      console.log(`New Socket Connected:`, socket.id);
      socket.on("event:init", (userId: string) => {
        this._sockets[userId] = socket;
      });
      socket.on("disconnect", (disconnectReason) => {
        console.log("Disconnect Reason:", disconnectReason);
      });
    });
  }
  public sendComment(userId: string, comment: Comment) {
    const io = this._io;
  }
}
