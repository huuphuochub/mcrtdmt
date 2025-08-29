import { HttpService } from "@nestjs/axios";
import { Body, Controller, Get, Post } from "@nestjs/common";
import { firstValueFrom, lastValueFrom } from "rxjs";
import { ViettelpostService } from "src/service/viettelpost.service";

@Controller('order')
export class OrderController {
  constructor(private readonly httpService: HttpService,
                private readonly ViettelpostService: ViettelpostService

  ) {}

  @Post('getviettelpost')
  async GetViettelpost(
    @Body() bodys:any
    
  ){
    // console.log(bodys);
    const grouped = bodys.product.reduce((acc, item) => {
  if (!acc[item.id_seller]) {
    acc[item.id_seller] = [];
  }
  acc[item.id_seller].push(item);
  return acc;
}, {});

// console.log(grouped);
// lấy các mảng của id seller
const sellerIds = Object.keys(grouped).map(id => parseInt(id));

// console.log(sellerIds);

// lấy thông tin chi tiết các seller từ id_user
const sellers:any = await this.httpService.post('http://localhost:3004/seller/inforseller', { sellerIds }).toPromise();
// console.log(sellers.data);


// gom product và seller thành các mảng dựa theo id_seller
const results  = sellers.data.map(seller =>{
  return{
    ...seller,
    product:bodys.product.filter(p => p.id_seller === seller.user_id)
  }
})

// console.log(results[0].product);


    const tokenfile =await this.ViettelpostService.getToken();
    let token=''
    // console.log(tokenfile);
    if(!tokenfile){
         token = await this.ViettelpostService.getTokenviettel();
        // console.log(token);
    }
    
    const create = new Date(tokenfile.create).getTime();
    const now = Date.now();
    const twoday = 24*60*60*1000

    if(now - create > twoday){
         token = await this.ViettelpostService.getTokenviettel();
        // console.log(token);
        
    }else{
         token = tokenfile.token;
        // console.log(token);
    }

    if(token){
        // console.log('hahahahahah');
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

        try {
            // console.log(token);
            
            // const response = await lastValueFrom(
            //       this.httpService.post(url, orderforviettel, {
            //          headers: {
            //             'Content-Type': 'application/json',
            //             'Token': token, // giống bên PHP
            //         },
            //       }),
            //     );

             const responses = await Promise.all(
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
            // console.log(responses.map(res => res.data)); 
            
            return responses.map(res => res.data);
                
        } catch (error) {
           if (error.response) {
                console.error("❌ API Error:", error.response.data);   // server trả gì in hết
                console.error("❌ Status:", error.response.status);
                console.error("❌ Headers:", error.response.headers);
            } else {
                console.error("❌ Unknown Error:", error.message);
            }
            throw error;
            
        }
    }
    
  }


  @Post('createqrpayos')
  async createOrder(@Body() orderData: any) {
    // Xử lý dữ liệu đơn hàng và gọi API tạo đơn hàng
    const response = await firstValueFrom(
            this.httpService.post('http://localhost:3004/order/createpaymentlink', orderData, {
                      // this.httpService.post('http://user:3004/users/login', body, {
    
              // withCredentials: true, // Gửi và nhận cookie
            }),
          );
          // console.log(response.data);
          
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
    // console.log(body);
    
    // console.log(response.data);

    return response.data;
  // return { message: 'OK', data: body };  // trả về để Nest không lỗi
  }
}