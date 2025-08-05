import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './product.dto';
import { PaginationDto } from './pagenation.dto';
@Controller('product')
export class ProductController {
    constructor(
        private productservice:ProductService,

    ){

    }


    @Post('add')
        async addProduct(@Body() dto: CreateProductDto) {
        // dto sẽ có đủ các field từ Product entity

        return this.productservice.addProduct(dto);
        }
    
    @Get('getall')
        async getallproduct(){
            return await this.productservice.getAllproduct()
        }
    @Get('bestseller')
        async getbeseller(@Query() paginationDto:PaginationDto){
            const limit = paginationDto.limit || 4;
            const page = paginationDto.page || 0;
            return await this.productservice.getBeseller({limit,page})
        }
    @Get('productdetail/:id')
        async getproductdetail(@Param('id') id:number){
            return this.productservice.getProductdetail(id);
        }
        
}
