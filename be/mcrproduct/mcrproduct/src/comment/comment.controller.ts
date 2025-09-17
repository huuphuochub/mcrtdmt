import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController {
    constructor(
        private commentservice:CommentService
    ){}
    @Post('addcomment')
    async AddComment(@Body() body:any){
        console.log(body);
        
        return await this.commentservice.Addcomment(body)
    }

    @Post('getallcmt')
    async getaalcmt(@Body() body:any){
        return await this.commentservice.Getallcomment(body)
        
        
    }
    @Delete('delete/:id')
    async Deletecmt(@Param('id') id:number){
        console.log(id);
        
        return await this.commentservice.deleteComment(id);
    }
}
