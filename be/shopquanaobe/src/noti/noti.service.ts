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
            try {
                const noti = this.notiRepo.create(body)
                const add = await this.notiRepo.save(noti)
                return{
                    success:true,
                    data:add,
                    message:'them',
                }
            } catch (error) {
                return{
                    suucess:false,
                    data:null,
                    messgae:'loi service'
                }
            }
        }

        async GetNotiSeller(seller_id:number){
            try {
                const notu= await this.notiRepo.findBy({
                    seller_id:seller_id
                })

                return{
                    success:true,
                    data:notu,
                    messgae:'ok',
                }
            } catch (error) {
                return{
                    success:false,
                    data:null,
                    message:'loi service',
                }
            }
        }
}
