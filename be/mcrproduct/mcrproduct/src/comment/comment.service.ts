import { Injectable, NotFoundException } from '@nestjs/common';
import { Comment } from './comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/product/product.entity';
@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment)
        private commentRepo:Repository<Comment>,

        @InjectRepository(Product)
        private productRepo:Repository<Product>


    ){}

    async Addcomment(body:any){
        try {
            const add = this.commentRepo.create({
                user_id: body.user_id,
                star: body.star,
                content: body.content,
                imageurl:body.imageurl,
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
    async deleteComment(id: number) {
        const comment = await this.commentRepo.findOne({
            where: { id },
            relations: ["product"],
        });

        if (!comment) throw new NotFoundException("Comment not found");

        const productId = comment.product_id;

        await this.commentRepo.remove(comment);

        await this.productRepo
            .createQueryBuilder()
            .update(Product)
            .set({
            ratingSum: () => `"ratingSum" - ${comment.star}`,
            ratingCount: () => `"ratingCount" - 1`,
            averageRating: () => `CASE 
                WHEN "ratingCount" - 1 > 0 
                THEN ("ratingSum" - ${comment.star})::decimal / ("ratingCount" - 1) 
                ELSE 0 END`
            })
            .where("id = :id", { id: productId })
            .execute();

        return { success: true };
        }


}
