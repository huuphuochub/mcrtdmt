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
        // console.log('da goi cai nay');
        
        return await  this.categoryservice.Getcategorybyid(id);
    }
    // lay cate by idsub
    // @Get("getbyidsub/:id")
    // async getcategorybyidsub(@Param('id')id:number){
    //     // console.log('da goi cai nay');
        
    //     return await  this.categoryservice.Getcategorybyidsub(id);
    // }

    
    

}
@Controller('subcategory')
export class Subcategorycontroller {

    constructor(
        private categoryservice:CategoryService,
    ){

    }
// lấy subcategory theo id của category
    @Get(":id")
    async getsubcategorybyidcategory(@Param('id') id: number){
        return this.categoryservice.Getsubcatebyidcategory(+id);
    }
    // lấy subcategory theo id của subcategory
    @Get('getsubcategorybyid/:id')
    async getsubcategorybyid(@Param('id')id:number){
        return  this.categoryservice.getsubcategorybyid(id);
    }

}