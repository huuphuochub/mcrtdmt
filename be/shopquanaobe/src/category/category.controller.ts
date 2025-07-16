import { Controller, Get, Param } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {

    constructor(
        private categoryservice :CategoryService,
    ){}
    @Get('getall')
    async Getall(){
        return await this.categoryservice.GetAllCate();
    }

}
@Controller('subcategory')
export class Subcategorycontroller {

    constructor(
        private categoryservice:CategoryService,
    ){

    }

    @Get(':id')
    async getsubcategorybyid(@Param('id') id: number){
        return this.categoryservice.Getsubcatebyid(+id);
    }
}