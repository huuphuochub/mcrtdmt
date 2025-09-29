// // src/chat/chat.service.ts
// import { Injectable } from '@nestjs/common';
// import { Server } from 'socket.io';

// interface ChatMessage {
//   user: string;
//   message: string;
// }

// @Injectable()
// export class ChatService {
//   private server: Server

//     setServer(server: Server) {
//     this.server = server;
//   }
//   // private messages: ChatMessage[] = [];

//   // saveMessage(msg: ChatMessage) {
//   //   this.messages.push(msg);
//   // }

//   // getMessages(): ChatMessage[] {
//   //   return this.messages;
//   // }

//   sendMessageToRoom(body:any) {
//     if (!this.server) {
//       console.warn('Socket server not set yet');
//       return;
//     }
//     this.server.to(room).emit('new_message', message);
//   }


// }
