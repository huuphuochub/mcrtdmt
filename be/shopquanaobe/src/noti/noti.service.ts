import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification } from './noti.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NotiService {
    constructor(
            @InjectRepository(Notification)
            private notiRepo:Repository<Notification>,
        ){}

        async AddNoti(body:any){
            
        }
}
