// src/chat/chat.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatItem } from './chatitem.entity';
import { Roomchat } from './chat.entity';
interface ChatMessage {
  user: string;
  message: string;
}

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Roomchat)
    private roomchatRepository: Repository<Roomchat>,
    @InjectRepository(ChatItem)
    private chatItemRepository: Repository<ChatItem>,
  ) {}


  async Createroom(seller_id:number,user_id:number){
    try {
      const newRoom = this.roomchatRepository.create({
        seller:{id:seller_id},
        user:{id:user_id},
        lastmessage:'Chào bạn, bạn cần hỗ trợ gì ạ?',
        status:0,
        userlast:'seller',
        date:new Date().toISOString()
      });
      const room = await this.roomchatRepository.save(newRoom);
      const item = this.chatItemRepository.create({
        seller:{id:seller_id},
        room:{id:room.id},
        message:'Chào bạn, bạn cần hỗ trợ gì ạ?',
        status:0,
      })
      await this.chatItemRepository.save(item)
      return{
        success:true,
        data:room,
        message:'da tạo thanh cong'
      }
    } catch (error) {
      
    }
  }

  async CheckRoom(seller_id:number,user_id:number){
    try {
      const room = await this.roomchatRepository.findOne({where:{seller:{id:seller_id},user:{id:user_id}}});
      if(!room){
        return {
          success:false,
          data:null,
          message:'chuaw cos phongf'
        };
      }
      return {
        success:true,
        data:room,
        message:'da co room'
      };
    } catch (error) {
      return false;
    }
  }
  async getRooms(user_id:number){
    try {
      const rooms = await this.roomchatRepository.find(
        {where:{user:{id:user_id}},
        relations:['seller']
      }
    );
      return {
        success: true,
        data: rooms,
      };
    
  
    } catch (error) {
      return {
        success: false,
        data: [],
        message: 'Lỗi khi lấy danh sách phòng chat',
      };
    }
  }
  async GetChatitems(room_id:number,page:number){
    const take = 20;
    const skip = (page - 1) *20;
    try {
       const items = await this.chatItemRepository
    .createQueryBuilder("chatitem")
    .leftJoin("chatitem.user", "user")
    .leftJoin("chatitem.seller", "seller")
    .where("chatitem.room_id = :room_id", { room_id })
    .orderBy("chatitem.createdAt", "DESC") // mới nhất trước
    .skip(skip)
    .take(take)
    .select([
      "chatitem.id",
      "chatitem.message",
      "chatitem.status",
      "chatitem.createdAt",
      "chatitem.imageurl",
      "chatitem.tag",
      "user.id",      // chỉ lấy id
      "seller.id",    // chỉ lấy id
    ])
    .getMany();

    
        return {
          success:true,
          data:items,
          message:'ok'
        };
    } catch (error) {
      return{
        success:false,
        message:'loi service',
        data:null
      }
    }

  }

  async GetRoomSeller(seller_id:number){
     try {
      const rooms = await this.roomchatRepository.find(
        {where:{seller:{id:seller_id}},
        order:{date:'DESC'},
        relations:['user']
      }
    );
      return {
        success: true,
        data: rooms,
      };
    
  
    } catch (error) {
      return {
        success: false,
        data: [],
        message: 'Lỗi khi lấy danh sách phòng chat',
      };
    }
  }

  async SendChat(form:any){
    console.log(form.tag.id);
    
    try {
      
      const send = this.chatItemRepository.create({
        room:{id:Number(form.room)},
        user:{id:form.user_id},
        seller:{id:form.seller_id},
        message:form.message,
        status:0,
        imageurl:form.imageurl,
        tag:form.tag.id ? form.tag : null
      })
      const ok = await this.chatItemRepository.save(send)

      
      await this.roomchatRepository.update(
        {id:Number(form.room)},
        {lastmessage:form.message,
          date: new Date()

        },
        // {date:}
      )
      return{
        success:true,
        message:'ok',
        data:ok,
      }
    } catch (error) {
      return{
        success:false,
        message:error,
        data:null
      }
    }
  }

  async WatchedMesItem(body:any){
    try {
      await this.chatItemRepository.update(
        {room:{id:Number(body.room)}},
        {status:1},
    )
    } catch (error) {
      
    }
  }

    async WatchedMesItemClick(body:any){
    try {
      await this.chatItemRepository.update(
        {room:{id:Number(body.room_id)}},
        {status:1},
      )
      await this.roomchatRepository.update(
        {id:Number(body.room_id)},
        {status:1}
      )
    } catch (error) {
      
    }
  }
}

