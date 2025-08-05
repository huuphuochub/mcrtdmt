import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { SubimgService } from './subimg.service';
import { CreateSubimgtDto } from './subimg.dto';
@Controller('subimg')
export class SubimgController {
    constructor(
        private SubimgService:SubimgService,

    ){

    }


    @Post('add')
        async addSubimg(@Body() dto: CreateSubimgtDto) {
        // dto sẽ có đủ các field từ Product entity

        return this.SubimgService.addSubimg(dto);
        }

    @Get('subimgbyid/:id')
    async getsubimgbyid(@Param("id")id:number){
        return this.SubimgService.getSubimgbyid(id);
    }

}
