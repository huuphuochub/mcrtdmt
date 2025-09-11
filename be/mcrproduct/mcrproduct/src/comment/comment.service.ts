import { Injectable } from '@nestjs/common';
import { Comment } from './comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/product/product.entity';
@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment)
        private commentRepo:Repository<Comment>


    ){}

    async Addcomment(body:any){
        try {
            const add = this.commentRepo.create({
                user_id: body.user_id,
                star: body.star,
                content: body.content,
                product: { id: body.product_id } as Product, // gán relation
                });

            const ok =await this.commentRepo.save(add);
            return {
                success:true,
                data:ok,
                message:'them thanh cong'
            }
        } catch (error) {
         return{
            data:error,
            message:'loi',
            success:false
         }   
        }
    }

    async Getallcomment(body:any) {
        const [comments,total] = await this.commentRepo.findAndCount({
            where:{product:{id:body.product_id}},
            order:{createAt:"DESC"},
            skip:(body.page - 1) * 10,
            take:10,
        });
       return {
            data: comments,
            total,
            currentPage: body.page,
            totalPages: Math.ceil(total / 10),
        };
    }

}
