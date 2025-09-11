import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HistorySearch } from './historysearch.entity';
import { Repository } from 'typeorm';
@Injectable()
export class HistorysearchService {
    constructor(
        @InjectRepository(HistorySearch)
        private historysearchRepo:Repository<HistorySearch>,
    ){}


        async AddKeyword(body:any) {
        const existed = await this.historysearchRepo.findOne({
            where: { user_id: body.user_id, keyword:body.keyword },
        });

        if (existed) {
            // update timestamp
            // existed.createdAt = new Date();
            return this.historysearchRepo.save(existed);
        }

        const history = this.historysearchRepo.create({ user_id: body.user_id, keyword:body.keyword });
        return this.historysearchRepo.save(history);
        }
        async Gethistorybyuser(id_user:number){
            try {
                const keywords = await this.historysearchRepo.find({
                where:{user_id:id_user},
                order:{createdAt:"DESC"}
            })
            return {
                success:true,
                message:'',
                data:keywords
            }
            } catch (error) {
                return{
                    success:false,
                    message:'loi service',
                    data:error
                }
            }
        }

        async Deletesearch(id:number){
            try {
                const xoa = await this.historysearchRepo.delete({id})
                return{
                     success:true,
                message:'',
                data:xoa
                }
            } catch (error) {
                return{
                    success:false,
                    message:'loi service',
                    data:error
                }
            }
        }

}
