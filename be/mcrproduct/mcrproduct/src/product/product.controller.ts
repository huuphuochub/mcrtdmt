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
// them san pham

    @Post('add')
        async addProduct(@Body() dto: CreateProductDto) {
        // dto sẽ có đủ các field từ Product entity

        return this.productservice.addProduct(dto);
        }
    // lay tat ca san pham
    @Get('getall')
        async getallproduct(@Query('limit') limit:string, @Query('page') page:string){
            return await this.productservice.getAllproduct(Number(limit),Number(page))
        }

        // lay san pham theo selle de selle xem
            @Get('getallbyseller')
        async getallproductseller(@Query('limit') limit:string, @Query('page') page:string,@Query('seller_id') seller_id:string){
            console.log(seller_id);
            
            return await this.productservice.getAllproductseller(Number(limit),Number(page),Number(seller_id))
        }
        // lay san pham theo nguoi ban
    @Get('bestseller')
        async getbeseller(@Query() paginationDto:PaginationDto){
            const limit = paginationDto.limit || 12;
            const page = paginationDto.page || 0;
            return await this.productservice.getBeseller({limit,page})
        }
        // lay chi tiet san pham
    @Get('productdetail/:id')
        async getproductdetail(@Param('id') id:number){
            return await this.productservice.getProductdetail(id);
        }
    // lay nhieu san pham theo category
    @Get('productsbycategory/:id')
    async getproductbycate(@Param('id') id:number){
        return await this.productservice.getProductbycategory(id);
    }
    // lay tat ca sn pham theo subcategory
    @Get('allproductbysubcate/:id')
    async getproductbysubcate(@Param('id') id:number){
        return this.productservice.getProductbysubcate(id);
    }
    @Post('batch')
    async getbatch(
        @Body('ids') ids:number[]
    ){
        if(!ids || ids.length === 0){
            return{
                success:false,
                data:null,
                message:'khong co mang id'
            }
        }
        return await this.productservice.Getbatch(ids);
    }

    @Post('searchkeypage')
    async searchproduct(@Body() body:any){
        // console.log('da gọi search');
        
        
        return await this.productservice.searchProductsService(body);
        
        
    }
    @Get('countproductseller/:id')
    async gettotalproductseller(@Param('id') id:number ){
        
        
        return await this.productservice.countproduct(id);
        
    }
    @Post('updateratingproduct')
    async apdateRating(@Body() body:any){
        return await this.productservice.UpdateRating(body);
    }

    @Post('getbestselling')
    async GetBestselling(@Body() body:any){
        // console.log(body);
        
        return await this.productservice.GetBestselling(body.page)
    }

    @Post('getratingproduct')
    async Getratingprd(@Body() body:any){
        return await this.productservice.Getratingprd(body.page)
    }

    @Post('getnewproduct')
    async Getnew(@Body() body:any){
        return await this.productservice.Getnewprodct(body.page)
    }
}
