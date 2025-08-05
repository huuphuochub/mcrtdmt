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
    @Get("getbyid/:id")
    async getcategorybyid(@Param('id')id:number){
        return await  this.categoryservice.Getcategorybyid(id);
    }

}
@Controller('subcategory')
export class Subcategorycontroller {

    constructor(
        private categoryservice:CategoryService,
    ){

    }

    @Get(':id')
    async getsubcategorybyidcategory(@Param('id') id: number){
        return this.categoryservice.Getsubcatebyidcategory(+id);
    }
    @Get('getsubcategorybyid/:id')
    async getsubcategorybyid(@Param('id')id:number){
        return  this.categoryservice.getsubcategorybyid(id);
    }

}