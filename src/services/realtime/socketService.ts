import { io, Socket } from "socket.io-client";
import type { ChatMessage, Grievance } from "../../types";

type ServerEvents = {
  "chat:message": (message: ChatMessage) => void;
  "chat:typing": (payload: { chatId: string; userId: string; typing: boolean }) => void;
  "grievance:update": (grievance: Grievance) => void;
  "notification:new": (payload: { id: string; title: string; priority: "high" | "medium" | "low" }) => void;
};

class SocketService {
  private socket: Socket<ServerEvents> | null = null;

  connect(token: string): void {
    if (this.socket?.connected) {
      return;
    }
    this.socket = io("https://api.colonyconnect.example.com", {
      transports: ["websocket"],
      auth: { token }
    });
  }

  disconnect(): void {
    this.socket?.disconnect();
    this.socket = null;
  }

  on<E extends keyof ServerEvents>(event: E, callback: ServerEvents[E]): void {
    this.socket?.on(event, callback);
  }

  off<E extends keyof ServerEvents>(event: E, callback: ServerEvents[E]): void {
    this.socket?.off(event, callback);
  }

  emitTyping(chatId: string, typing: boolean): void {
    this.socket?.emit("chat:typing", { chatId, typing });
  }
}

export const socketService = new SocketService();
