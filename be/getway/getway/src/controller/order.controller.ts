import { HttpService } from "@nestjs/axios";
import { Body, Controller, Get, Inject, Param, Post, Req, UnauthorizedException } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { response } from "express";
import { firstValueFrom, lastValueFrom } from "rxjs";
import { ViettelpostService } from "src/service/viettelpost.service";
interface RequestWithCookies extends Request {
  cookies: Record<string, string>;
}
@Controller('order')
export class OrderController {
  constructor(private readonly httpService: HttpService,
                private readonly ViettelpostService: ViettelpostService,
            @Inject('SEND_MAIL_ORDER') private readonly sendMailOrder: ClientProxy,
                

  ) {}

  @Post('getviettelpost')
  async GetViettelpost(
    @Body() bodys:any
    
  ){ 
    const grouped = bodys.product.reduce((acc, item) => {
  if (!acc[item.id_seller]) {
    acc[item.id_seller] = [];
  }
  acc[item.id_seller].push(item);
  return acc;
}, {});

// lấy các mảng của id seller
const sellerIds = Object.keys(grouped).map(id => parseInt(id));


// lấy thông tin chi tiết các seller từ id_user
const sellers:any = await this.httpService.post('http://localhost:3004/seller/inforseller', { sellerIds }).toPromise();


// gom product và seller thành các mảng dựa theo id_seller
const results  = sellers.data.map(seller =>{
  return{
    ...seller,
    product:bodys.product.filter(p => p.id_seller === seller.user_id)
  }
})

//  lấy token ở file
    const tokenfile =await this.ViettelpostService.getToken();
    let token=''
    if(!tokenfile){
         token = await this.ViettelpostService.getTokenviettel();
    }else{
      token = tokenfile.token;
    }
    
//  nếu có token tạo body theo fomat của viettepost
    if(token){
const orderforviettel = results.map(seller => {
  const listproduct = seller.product.map(p => ({
    PRODUCT_NAME: p.name,
    PRODUCT_PRICE: p.price,
    PRODUCT_WEIGHT: 200,
    PRODUCT_QUANTITY: p.quantity
  }));

  

  const totalWeight = seller.product.reduce(
    (sum, p) => sum + p.weight * p.quantity,
    0
  );

  return {
    ORDER_NUMBER: "12",
    GROUPADDRESS_ID: 5818802,
    CUS_ID: 722,
    DELIVERY_DATE: "11/10/2018 15:09:52",
    SENDER_FULLNAME: seller.usernameseller,
    SENDER_ADDRESS: seller.address,
    SENDER_PHONE: "1234567890",
    SENDER_EMAIL: seller.email,
    SENDER_WARD: seller.wardsId,
    SENDER_DISTRICT: seller.districtId,
    SENDER_PROVINCE: seller.provinceId,
    SENDER_LATITUDE: 0,
    SENDER_LONGITUDE: 0,
    RECEIVER_FULLNAME: bodys.username,
    RECEIVER_ADDRESS: bodys.address,
    RECEIVER_PHONE: bodys.phone,
    RECEIVER_EMAIL: bodys.email,
    RECEIVER_WARD: Number(bodys.wardsId),
    RECEIVER_DISTRICT: Number(bodys.districtId),
    RECEIVER_PROVINCE: Number(bodys.provinceId),
    RECEIVER_LATITUDE: 0,
    RECEIVER_LONGITUDE: 0,
    ORDER_NOTE: bodys.note,
    PRODUCT_NAME: "Máy xay sinh tố Philips HR2118 2.0L ",
    PRODUCT_DESCRIPTION: "Máy xay sinh tố Philips HR2118 2.0L ",
    PRODUCT_QUANTITY: 1,
    PRODUCT_PRICE: 2292764,
    PRODUCT_WEIGHT: totalWeight,
    PRODUCT_LENGTH: 38,
    PRODUCT_WIDTH: 24,
    PRODUCT_HEIGHT: 25,
    PRODUCT_TYPE: "HH",
    ORDER_PAYMENT: 3,
    ORDER_SERVICE: "VCBO",
    ORDER_SERVICE_ADD: "",
    ORDER_VOUCHER: "",
    MONEY_COLLECTION: 2292764,
    MONEY_TOTALFEE: 0,
    MONEY_FEECOD: 0,
    MONEY_FEEVAS: 0,
    MONEY_FEEINSURRANCE: 0,
    MONEY_FEE: 0,
    MONEY_FEEOTHER: 0,
    MONEY_TOTALVAT: 0,
    MONEY_TOTAL: 0,
    LIST_ITEM: listproduct
  };
});



        const url =`https://partner.viettelpost.vn/v2/order/createOrder`

        // gọi api viettelpost
    const callapi = async(token) =>{
         return await Promise.all(
              orderforviettel.map(order =>
                
                lastValueFrom(
                  this.httpService.post(url, order, {
                    headers: {
                      'Content-Type': 'application/json',
                      'Token': token
                    }
                  })
                )
                
              )
            );
    }

  let responses = await callapi(token);
//  nếu toekn k hợp lệ thì gọi lại để lấy token mới
  if (responses.some(res => res.data.error === true)) {

    token = await this.ViettelpostService.getTokenviettel(); // refresh token
    responses = await callapi(token);
  }

  return responses.map(res => res.data);
        // try {
        //      const responses = await Promise.all(
        //       orderforviettel.map(order =>
        //         lastValueFrom(
        //           this.httpService.post(url, order, {
        //             headers: {
        //               'Content-Type': 'application/json',
        //               'Token': token
        //             }
        //           })
        //         )
        //       )
        //     );
        //     return responses.map(res => res.data);

            
            
                
        // } catch (error) {

        //     }
        //     throw error;
            
        // }
    }

    
    
  }


  @Post('createqrpayos')
  async createpayos(@Body() orderData: any) {
    // Xử lý dữ liệu đơn hàng và gọi API tạo đơn hàng
    const response = await firstValueFrom(
            this.httpService.post('http://localhost:3004/order/createpaymentlink', orderData, {
                      // this.httpService.post('http://user:3004/users/login', body, {
    
              // withCredentials: true, // Gửi và nhận cookie
            }),
          );
          
          return response.data 
  }

  @Post('checkordercode')
  async checkOrderCode(@Body() body: any) {
    
    const response = await firstValueFrom(
      this.httpService.post('http://localhost:3004/order/checkordercode', body, {
        // this.httpService.post('http://user:3004/users/login', body, {

        // withCredentials: true, // Gửi và nhận cookie
      }),
    );

    
    if(response.data.result.success){
      if(response.data.result.data.status === 'PAID'){
        await firstValueFrom(
          this.httpService.post('http://localhost:3004/order/updatestatus',{
            ordercode:body.ordercode,
            status:1
          })
        )
      }
    }

    return response.data;
  // return { message: 'OK', data: body };  // trả về để Nest không lỗi
  } 

  @Post('createorder')
  async createOrder(@Body() body:any,@Req() req: RequestWithCookies ){
  const token = req.cookies?.access_token;

      if (!token) {
     return {
                success:false,
                message:'chua dang nhap',
                data:null,
                code:404
            }
  }
        try {
          const { data } = await firstValueFrom(
            this.httpService.post('http://localhost:3004/order/createorder',body, {
                    // this.httpService.get('http://user:3004/users/me', {

              headers: {
                Authorization: `Bearer ${token}`,
              },
            }),
          );
          return data;
        } catch (error: any) {
          const errRes = error.response?.data;

          // Log hoặc ném lại lỗi tùy ý
          throw new UnauthorizedException({
            success: false,
            code: errRes?.code || 'SERVICE_ERROR',
            message: errRes?.message || 'Lỗi từ user-service',
          });
        }

  }

  @Get('getorderitem/:ordercode')
  async getorderdetail(@Req() req:RequestWithCookies,@Param('ordercode') ordercode:string){
      const token = req.cookies?.access_token;
      

      if (!token) {
     return {
                success:false,
                message:'chua dang nhap',
                data:null,
                code:404
            }
      }

              try {
          const { data } = await firstValueFrom(
            this.httpService.get(`http://localhost:3004/order/getorderitem/${ordercode}`, {
                    // this.httpService.get('http://user:3004/users/me', {

              headers: {
                Authorization: `Bearer ${token}`,
              },
            }),
          );
          return data;
        } catch (error: any) {
          const errRes = error.response?.data;

          // Log hoặc ném lại lỗi tùy ý
          throw new UnauthorizedException({
            success: false,
            code: errRes?.code || 'SERVICE_ERROR',
            message: errRes?.message || 'Lỗi từ user-service',
          });
        }

  }


    @Post('updatestatus')
    async updatestatus(@Body() body: any) {
      try {
        const response = await firstValueFrom(
          this.httpService.post('http://localhost:3004/order/updatestatus', body)
        );

        // chỉ trả về data cho FE
        return {
          success: true,
          data: response.data,
        };
      } catch (error) {

        return {
          success: false,
          message: error.response?.data?.message || error.message,
          code: error.response?.status || 500,
        };
      }
    }

    @Get('getorderitembyid/:id')
    async Getorderitembyid(@Param('id') id:number, @Req() req:RequestWithCookies){
      const token = req.cookies?.access_token;
      if(!token){
        return{
          success:false,
          data:null,
          message:"vui lòng đăng nhập"
        }
      }
      try {
        const response = await firstValueFrom(
          this.httpService.get(`http://localhost:3004/order/getorderitembyid/${id}`,{
            headers: {
                Authorization: `Bearer ${token}`,
              },
          })
        );

        // chỉ trả về data cho FE
        return {
          success: response.data.success,
          data: response.data,
        };
      } catch (error) {

        return {
          success: false,
          message: error.response?.data?.message || error.message,
          code: error.response?.status || 500,
        };
      }
    }

    @Get('getallorder')
    async Ggetallorder(@Req() req:RequestWithCookies){

      const token = req.cookies?.access_token;
      if(!token){
        return{
          success:false,
          data:null,
          message:"vui lòng đăng nhập"
        }
      }
            try {
        const response = await firstValueFrom(
          this.httpService.get(`http://localhost:3004/order/getallorder/`,{
            headers: {
                Authorization: `Bearer ${token}`,
              },
          })
        );

        // chỉ trả về data cho FE
        return {
          success: response.data.success,
          data: response.data,
        };
      } catch (error) {

        return {
          success: false,
          message: error.response?.data?.message || error.message,
          code: error.response?.status || 500,
        };
      }
    }

    // @Post('sendemailorder')
    // async senmailorder(@Body() body:any) {
    //   return await this.sendMailOrder.send('mailer_order' ,{
    //     body
    //   }).toPromise();
    // }

    @Post('sendemailorder')
    async senmailorder(@Body() body: any) {
      this.sendMailOrder.emit('mailer_order', { body }); // không await
      return { success: true, message: 'Email job queued' };
    }


    @Post('updateordermail')
    async updateordermail(@Body() body:any){ 
    try {
            const response:any =   await this.httpService.post('http://localhost:3004/order/updateordermail',body)
      return{
        success:true,
        data:response.data,
        message:false
      }
    } catch (error) {
      return{
        success:false,
        message:error,
        data:null,
      }
    }       
    }

    @Get('checkhasbought/:product_id')
    async CheckHasBought(@Param('product_id') product_id:number, @Req() req:RequestWithCookies){
      
         const token = req.cookies?.access_token;
      if(!token){
        
        return{
          success:false,
          data:null,
          message:"vui lòng đăng nhập"
        }
      }
            try {
        const response = await firstValueFrom(
          this.httpService.get(`http://localhost:3004/order/hasbought/${product_id}`,{
            headers: {
                Authorization: `Bearer ${token}`,
              },
          })
        );
        
        return{
        success:true,
        data:response.data.data,
        message:false
      }

    }catch(error){
            console.log(error);

       return{
        success:false,
        message:error,
        data:null,
      }
      
    }
    
  

  }  
}