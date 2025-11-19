// src/chat/chat.gateway.ts
import {
  WebSocketGateway,
  SubscribeMessage,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
// import { ChatService } from '../chat.service';
import { HttpService } from '@nestjs/axios';
import { log } from 'console';
import { JwtService } from '@nestjs/jwt';
import * as cookie from 'cookie';
const urluser = 'http://localhost:3004'
// const urlproduct = '${urlproduct}'
@WebSocketGateway({
  cors: {
    origin: [
      'http://localhost:3000',
      'http://frontend:3000',
      'http://127.0.0.1:3000',
    ],
    credentials: true,
  },
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    // private readonly chatService: ChatService, 
    private readonly httpService: HttpService,private readonly jwtService: JwtService) {}

   private users: { user_id: number; socketId: string }[] = [];
  private sellers: { seller_id: number; socketId: string }[] = [];


handleConnection(client: Socket) {
  const cookies = cookie.parse(client.handshake.headers.cookie || '');

  const token = cookies['access_token'];
  const tokenseller = cookies['seller_token'];

  try {
    // Nếu có user token
    if (token) {
      const payload = this.jwtService.verify(token);
      this.users.push({ user_id: payload.id, socketId: client.id });
    }

    // Nếu có seller token
    if (tokenseller) {
      const sellerPayload = this.jwtService.verify(tokenseller);
      this.sellers.push({ seller_id: sellerPayload.seller_id, socketId: client.id });
    }


  } catch (err) {
    client.disconnect();
  }
}

  // Khi client ngắt kết nối
  handleDisconnect(client: Socket) {
    this.users = this.users.filter(u => u.socketId !== client.id);
    this.sellers = this.sellers.filter(s => s.socketId !== client.id);
  }


public processAndEmit(newmessage: any) {
  if (!this.server) return;

  if (newmessage.role === 'user') {
    const targetSeller = this.sellers.find(
      (s) => s.seller_id === Number(newmessage.seller.id),
    );
    const uuss = this.users.find(
      (uu) => uu.user_id === Number(newmessage.user.id),
    );

    if (uuss) {
      this.server.to(uuss.socketId).emit('new_message', newmessage);
    }

    if (targetSeller) {
      
      this.server.to(targetSeller.socketId).emit('new_message', newmessage);
    }
  } 
  
  else if (newmessage.role === 'seller') {
    const targetUser = this.users.find(
      (u) => u.user_id === Number(newmessage.user.id),
    );
    const ssll = this.sellers.find(
      (u) => u.seller_id === Number(newmessage.seller.id),
    );

    if (targetUser) {
      this.server.to(targetUser.socketId).emit('new_message', newmessage);
    }

    if (ssll) {
      
      this.server.to(ssll.socketId).emit('new_message', newmessage);
    }
  }
}


  @SubscribeMessage('watch_mess')
  async handleMessage(client: Socket, payload: any) {
    try {
        // const ok =  await this.httpService.post('http://localhost:3004/chat/watchitem',payload).toPromise()
                const ok =  await this.httpService.post(`${urluser}/chat/watchitem`,payload).toPromise()


    } catch (error) {
      
    }
    
    this.server.emit('watched_mess', payload);
  }

    @SubscribeMessage('watchitem_click')
  async handlewatchitemclick(client: Socket, payload: any) {
    try {
        // const ok =  await this.httpService.post('http://localhost:3004/chat/watchitemclick',payload).toPromise()
                const ok =  await this.httpService.post(`${urluser}/chat/watchitemclick`,payload).toPromise()


    } catch (error) {
      
    }
    
    this.server.emit('watched_mess', payload);
  }

 
  
}
