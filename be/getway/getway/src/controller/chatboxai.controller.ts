import { HttpService } from '@nestjs/axios';
import { Controller, Post, Body } from '@nestjs/common';
import { GeminiService } from 'src/service/geminiai';

@Controller('gemini')
export class GeminiController {
  constructor(private readonly geminiService: GeminiService,        private readonly httpService: HttpService,
  ) {}

  @Post('send')
  async generate(@Body() body: any) {
//     const prompts = `
// Bạn là nhân viên tư vấn bán hàng online của shop Leftfashion.
// Trả lời câu hỏi của khách hàng thật tự nhiên, ngắn gọn, thân thiện.
// Nếu khách hỏi về sản phẩm, lấy tên sản phẩm đó và trả về đúng dạng JSON {"product": "tên"}. Lưu ý nếu khách nhập sai chính tả hãy sửa lại.
// Nếu khách hỏi về giá khoảng bao nhiêu đến bao nhiêu mà không có tên sản phẩm hay danh mục thì hãy hỏi lại khách bạn muốn tìm sản phẩm hay danh mục nào ạ. Lưu ý nếu khách nhập sai chính tả hãy sửa lại.
// Nếu khách hỏi tên danh mục và giá khoảng bao nhiêu đến bao nhiêu thì trả về đúng dạng JSON {"category" : "tên danh mục","star":"giá bắt đầu","end":"giá kết thúc"}. lưu ý giá làm thành đơn vị như 100k thành 100000 ... . Lưu ý nếu khách nhập sai chính tả hãy sửa lại.
// Nếu khách hỏi tên sản phẩm và giá khoảng bao nhiêu đến bao nhiêu thì trả về đúng dạng JSON {"product" : "tên sản phẩm","star":"giá bắt đầu","end":"giá kết thúc"}. lưu ý giá làm thành đơn vị như 100k thành 100000 ... . Lưu ý nếu khách nhập sai chính tả hãy sửa lại.
// Nếu khách hàng hỏi về danh mục sản phẩm, lấy tên danh mục đó và trả lời về đúng dạng JSON {"category":"tên"}. Lưu ý nếu khách nhập sai chính tả hãy sửa lại.
// Nếu khách hàng hỏi về sản phẩm bán chạy nhất thì trả lời về đúng dạng JSON {"bestselling":"bán chạy"}.
// Nếu khách hỏi về số điện thoại hay email thì trả lời số đt là sdt:012345678 hoặc email là huuphuoc532004@gmail.com.
// Nếu khách hàng hỏi về phương thức tính giá ship thì trả lời thân thiện là shop tính phí ship dựa theo khoảng cách từ shop đến khách hàng dựa theo giá của ViettelPost, nếu đơn của bạn có 2 cửa hàng trong một đơn thì sẽ tính giá dựa theo 2 khoảng cách.
// Nếu khách hỏi về tình trạng còn hàng, lấy tên sản phẩm đó và trả về đúng dạng JSON {"product":"tên","quantity":"instock"}. Lưu ý nếu khách nhập sai chính tả hãy sửa lại.
// Nếu khách hàng hỏi về sản phẩm mà không nói rõ tên, hãy hỏi lại khách hàng tên sản phẩm cần tìm. Lưu ý nếu khách nhập sai chính tả hãy sửa lại.
// Nếu khách hàng hỏi về danh mục mà không có tên, hãy trả lời như dữ liệu có sẵn và hỏi lại khách cần tìm sản phẩm nào. Lưu ý nếu khách nhập sai chính tả hãy sửa lại.
// Nếu khách hàng hỏi về các yêu cầu hỗ trợ, hãy trả lời các bước để hỗ trợ: bước 1 nhấp vào Hỗ trợ ở menu, bước 2: chọn mục cần hỗ trợ, bước 3: nhập thông tin cần hỗ trợ, và các yêu cầu sẽ được phản hồi trong 24 giờ kể từ khi gửi. (các yêu cầu hỡ trợ gồm đơn hàng, sản phẩm, tài khoản) 
// Nếu khách hàng hỏi về các cửa hàng, hãy trả lời hãy chọn mục cửa hàng trên menu.
// Nếu khách hỏi về cách đăng kí bán hàng, hãy trả lời các bước: b1 nhấp vào đăng kí bán hàng ở menu, bước 2 nhập các yêu cầu, b3 bấm đăng kí.
// Nếu khách hỏi về phương thức thành toán thì trả lời có 2 phương thức là COD và Thanh toán online qua qr ngân hàng.

// Nếu khách hàng hỏi về các mục khách không có ở trên, hãy trả lời shop hiện không hỗ trợ yêu cầu này.

// Danh mục:
// máy tính, quần áo, đồ điện tử, đồ trẻ em, đồ gia dụng.


// Khách hỏi: ${body.prompt}
// `;
    // console.log('Đã nhận prompt:', prompts);
    const response = await this.geminiService.detectIntent(body.prompt);
    switch (response.intent) {
  case 'product_query':
  case 'product_quantity':
  case 'product_search':
    // Gọi service tìm DB
    try {
      const products:any = await this.httpService.post('http://localhost:3002/product/searchproductchatai',{
      keyword: response.product,
      category: response.category,
      minprice: response.minprice,
      maxprice: response.maxprice,
    }).toPromise();

    const ok = await this.geminiService.askGemini(body.prompt,products.data.data)
            console.log(products.data);

        return(ok);
        

    } catch (error) {
      return(error.message);
      
    }

    
   
    // break;

  case 'general':

  try {
    const mes = await this.geminiService.oklaGemini(body.prompt)
    return mes
  } catch (error) {
    
  }
  default:
    return 'Dạ, để em hỗ trợ thêm ạ ❤️';
}
  }
}
