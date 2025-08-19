import { Controller, Get, Param, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';


@Controller('category')
export class Categorycontroller {
      constructor(private readonly httpService: HttpService) {}

   @Get('getall')
  async getProfile() {
    const response = await this.httpService
    .get('http://localhost:3004/category/getall')
    .toPromise();
  // console.log(response);
  
  return response!.data;  
  }
  
  @Get('getjsoncategory/:id')
  async getCategory(@Param('id') id:number){
    console.log(id);
    
    const response = await this.httpService.get(`http://localhost:3004/category/getbyid/${id}`)
    .toPromise()
    if(!response){
      return{
        success:false,
        message:'khong tim thay danh muc',
        data:null,
      }
    }
    // return response!.data;
    // console.log(response.data);
    // const product = response.data;

    const [subcate,allcate,products] = 
    await Promise.allSettled([
      this.httpService
      .get(`http://localhost:3004/subcategory/${id}`).toPromise(),
      this.httpService
      .get(`http://localhost:3004/category/getall`).toPromise(),
      this.httpService
      .get(`http://localhost:3002/product/productsbycategory/${id}`).toPromise()
    ])

    // console.log(subcate?.data);
    // console.log(allcate?.data);
    // console.log(products?.data);
    
    
    
    return{
      success:true,
      data:{
        products: products.status === 'fulfilled' ? products.value?.data ?? [] : [],
        subcate: subcate.status === 'fulfilled' ? subcate.value?.data ?? [] : [],
        allcate: allcate.status === 'fulfilled' ? allcate.value?.data ?? [] : [],
        category:response.data.data
      }
    }
    
  }


  @Get('getjsonsubcategory/:id')
  async getSubCategory(@Param('id') id:number){
    console.log(id);
    
    const response = await this.httpService.get(`http://localhost:3004/subcategory/getsubcategorybyid/${id}`)
    .toPromise()
    if(!response){
      return{
        success:false,
        message:'khong tim thay danh muc',
        data:null,
      }
    }
    // return response!.data;
    console.log(response.data);
    // const product = response.data;

    const [catedetail,allcate,products,allsubcate] = 
    await Promise.allSettled([
      this.httpService
      .get(`http://localhost:3004/category/getbyid/${response.data.data.categoryId}`).toPromise(),
      this.httpService
      .get(`http://localhost:3004/category/getall`).toPromise(),
      this.httpService
      .get(`http://localhost:3002/product/allproductbysubcate/${id}`).toPromise(),
      this.httpService
      .get(`http://localhost:3004/subcategory/${response.data.data.categoryId}`).toPromise(),
    ])

    // console.log(subcate?.data);
    // console.log(allcate?.data);
    // console.log(products?.data);
    // console.log(subcatedetail?.data);
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


