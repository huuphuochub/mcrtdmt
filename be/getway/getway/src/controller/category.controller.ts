import { Controller, Get, Param, Query, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';

const urluser = '${urluser}'
const urlproduct = 'http://localhost:3002'
@Controller('category')
export class Categorycontroller {
      constructor(private readonly httpService: HttpService) {}

      

   @Get('getall')
  async getProfile() {
    const response = await this.httpService
    // .get('${urlproduct}/category/getall')
        .get('${urlproduct}/category/getall')

    .toPromise();
  
  return response!.data;  
  }
  
  @Get('getjsoncategory/:id')
  async getCategory(@Param('id') id:number,
  @Query('keyword') keyword:string,
      @Query('page') page:string, 
      // @Query('category') category:string, 
      @Query('subcate') subcate:string,
      @Query('bestselling') bestselling:string,
      @Query('rating') rating:string,
      @Query('discount') discount:string,
      @Query('newdate') newdate:string,
      @Query('minprice') minprice:string,
      @Query('maxprice') maxprice:string,
){
  const body = {
    keyword,
    page:Number(page),
    subcate:Number(subcate),
    bestselling:Number(bestselling),
    rating : Number(rating),
    discount : Number(discount),
    newdate : Number(newdate),
    minprice : Number(minprice),
    maxprice : Number(maxprice),
    category:Number(id),
  }
    
  
    // const response = await this.httpService.get(`${urlproduct}/category/getbyid/${id}`)
        const response = await this.httpService.get(`${urlproduct}/category/getbyid/${id}`)

    .toPromise()
    if(!response){
      return{
        success:false,
        message:'khong tim thay danh muc',
        data:null,
      }
    }
    // return response!.data;
    // const product = response.data; 

    const [subcatess,allcate,products] = 
    await Promise.allSettled([
      this.httpService
      // .get(`${urlproduct}/subcategory/${id}`).toPromise(),
            .get(`${urlproduct}/subcategory/${id}`).toPromise(),

      this.httpService
      // .get(`${urlproduct}/category/getall`).toPromise(),
            .get(`${urlproduct}/category/getall`).toPromise(),

      this.httpService
      // .post(`${urlproduct}/product/filteruser`,body).toPromise()
            .post(`${urlproduct}/product/filteruser`,body).toPromise()

    ])


    
    
    
    return{
      success:true,
      data:{
        products: products.status === 'fulfilled' ? products.value?.data ?? [] : [],
        subcate: subcatess.status === 'fulfilled' ? subcatess.value?.data ?? [] : [],
        allcate: allcate.status === 'fulfilled' ? allcate.value?.data ?? [] : [],
        category:response.data.data
      }
    }
    
  }


  @Get('getjsonsubcategory/:id')
  async getSubCategory(@Param('id') id:number,
     @Query('keyword') keyword:string,
      @Query('page') page:string, 
      // @Query('category') category:string, 
      // @Query('subcate') subcate:string,
      @Query('bestselling') bestselling:string,
      @Query('rating') rating:string,
      @Query('discount') discount:string,
      @Query('newdate') newdate:string,
      @Query('minprice') minprice:string,
      @Query('maxprice') maxprice:string,

){
    
      const body = {
    keyword,
    page:Number(page),
    subcate:Number(id),
    category:0,
    bestselling:Number(bestselling),
    rating : Number(rating),
    discount : Number(discount),
    newdate : Number(newdate),
    minprice : Number(minprice),
    maxprice : Number(maxprice), 
    // category:Number(id),
  }
  
    // const response = await this.httpService.get(`${urlproduct}/subcategory/getsubcategorybyid/${id}`)
        const response = await this.httpService.get(`${urlproduct}/subcategory/getsubcategorybyid/${id}`)

    .toPromise()
    if(!response){
      return{
        success:false,
        message:'khong tim thay danh muc', 
        data:null,
      }
    }
    // return response!.data;
    // const product = response.data;

    const [catedetail,allcate,products,allsubcate] = 
    await Promise.allSettled([
      this.httpService
      // .get(`${urlproduct}/category/getbyid/${response.data.data.categoryId}`).toPromise(),
            .get(`${urlproduct}/category/getbyid/${response.data.data.categoryId}`).toPromise(),

      this.httpService
      // .get(`${urlproduct}/category/getall`).toPromise(),
            .get(`${urlproduct}/category/getall`).toPromise(),

      this.httpService
      // .post(`${urlproduct}/product/filteruser`,body).toPromise(),
            .post(`${urlproduct}/product/filteruser`,body).toPromise(),

      this.httpService
      // .get(`${urlproduct}/subcategory/${response.data.data.categoryId}`).toPromise(),
            .get(`${urlproduct}/subcategory/${response.data.data.categoryId}`).toPromise(),

    ])

   
    // chi tiet cate da co 
    // chi tiet sub da co
    // product da cos
    // list cate da co
    // lits subcate
    
    
    
    return{
      success:true,
      data:{
        products: products.status === 'fulfilled' ? products.value?.data ?? [] : [],
        categorydetail: catedetail.status === 'fulfilled' ? catedetail.value?.data.data ?? [] : [],
        allcate: allcate.status === 'fulfilled' ? allcate.value?.data ?? [] : [],
        allsubcate:allsubcate.status === 'fulfilled' ? allsubcate.value?.data ?? [] : [],
        subcatedetail:response.data.data,
      }
    }
    
  }









  
}


