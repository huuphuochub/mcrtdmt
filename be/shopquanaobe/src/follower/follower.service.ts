import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Follower } from './follow.entity';
import { Repository } from 'typeorm';
import { Seller } from 'src/seller/seller.entity';
@Injectable()
export class FollowerService {
    constructor(
            @InjectRepository(Follower)
            private folowerRepo:Repository<Follower>,

            @InjectRepository(Seller)
            private sellerRepo:Repository<Follower>,
        ){}

        async AddFl(body:any){
            try {
                const fl = this.folowerRepo.create({
                    user_id:body.user_id,
                    seller_id:body.seller_id
                })
                 await this.folowerRepo.save(fl);
                await this.sellerRepo.increment(
                    { id: body.seller_id },
                    "follower",
                    1
                    );
            } catch (error) {
                
            }
        }

        async CheckFl(body:any){
            try {
                const fl = await this.folowerRepo.findOne({
                    where:{user_id:body.user_id,seller_id:body.seller_id}
                })
                if(fl){
                    return{
                        success:true,
                        data:fl,
                        message:'da theo gioi'
                    }
                }
                return{
                    success:false,
                    data:null,
                    message:'chua fl'
                }
            } catch (error) {
                 return{
                    success:false,
                    data:null,
                    message:'loi fl'
                }
            }
        }

         async Unfls(body:any){
            console.log(body);
            
            try {
                const fl = await this.folowerRepo.findOne({
                    where:{user_id:body.user_id,seller_id:body.seller_id}
                })
                if(fl){
                    await this.folowerRepo.delete(fl);

                     await this.sellerRepo.increment(
                    { id: body.seller_id },
                    "follower",
                    -1
                    );
                }
                return{
                    success:false,
                    data:null,
                    message:'xoa'
                }
            } catch (error) {
                 return{
                    success:false,
                    data:null,
                    message:error.message
                }
            }
        }
}
