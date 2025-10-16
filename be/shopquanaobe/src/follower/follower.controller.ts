import { Body, Controller, Post } from '@nestjs/common';
import { FollowerService } from './follower.service';
@Controller('follower')
export class FollowerController {
    constructor(private followerService : FollowerService){}


    @Post('addfl')
    async AddFl(@Body() body:any){
        
        return await this.followerService.AddFl(body);
    }

    @Post('checkfl')
    async CheckFl(@Body() body:any){
        return await this.followerService.CheckFl(body);
    }

    
    @Post('unfl')
    async Unfl(@Body() body:any){
        return await this.followerService.Unfls(body);
    }
}
