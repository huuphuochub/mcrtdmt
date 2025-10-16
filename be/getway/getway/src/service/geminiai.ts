import { Injectable } from '@nestjs/common';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class GeminiService {
  private genAI: GoogleGenerativeAI;

  constructor() {
    this.genAI = new GoogleGenerativeAI("AIzaSyDtW5myzBwdZO-e6ZRsFXKgtpht6hIllhg");
  }

async askGemini(prompt: string, data: any): Promise<any> {
  const model = this.genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

  const fullPrompt = `
Bạn là nhân viên tư vấn bán hàng online của shop Leftfashion.

Dữ liệu dưới đây là danh sách sản phẩm trong kho (JSON):
${JSON.stringify(data.slice(0, 10), null, 2)}

Khách hỏi: "${prompt}"

Hãy phân tích và trả lời theo hướng dẫn:
- Hãy trả về JSON **thuần túy** đúng cấu trúc sau, không thêm ký tự Markdown (\`\`\`json hoặc \`\`\`):
{
  "message": "Câu trả lời thân thiện, ngắn gọn, tự nhiên như nhân viên tư vấn thật.",
  "products": [
    {
      "id": id sản phẩm,
      "name": "tên sản phẩm",
      "image": "hình sản phẩm",
      "price": giá gốc,
      "discountprice": giá khuyến mãi nếu có,
      "quantity": số lượng còn,
      "promo_start" :"thời gian bắt đầu giảm giá dựa theo dữ liệu",
      "promo_end" : "thời gian kết thúc giảm giá dựa theo dữ liệu",
      
    }
  ]
}
- Nếu không có sản phẩm phù hợp, trả về:
{
  "message": "Câu trả lời thân thiện giải thích không tìm thấy sản phẩm phù hợp.",
  "products": []
}

⚠️ Quy tắc:
- Giá hiển thị dạng số nguyên (ví dụ 89000).
- Không thêm text ngoài JSON, chỉ trả về đúng JSON hợp lệ.
`;

  const result = await model.generateContent(fullPrompt);
  const text = result.response.text();

  try {
    return JSON.parse(text); // parse về object luôn
  } catch (e) {
    console.error("❌ Parse JSON lỗi:", text);
    return { message: text, products: [] }; // fallback
  }
}

async oklaGemini(promt:string) :Promise<any> {
    const model = this.genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
   const prompts = `
Bạn là nhân viên tư vấn bán hàng online của shop Leftfashion.
Trả lời câu hỏi của khách hàng thật tự nhiên, ngắn gọn, thân thiện.
Nếu khách hỏi về số điện thoại hay email thì trả lời số đt là sdt:012345678 hoặc email là huuphuoc532004@gmail.com.
Nếu khách hàng hỏi về phương thức tính giá ship thì trả lời thân thiện là shop tính phí ship dựa theo khoảng cách từ shop đến khách hàng dựa theo giá của ViettelPost, nếu đơn của bạn có 2 cửa hàng trong một đơn thì sẽ tính giá dựa theo 2 khoảng cách.
Nếu khách hàng hỏi về sản phẩm mà không nói rõ tên, hãy hỏi lại khách hàng tên sản phẩm cần tìm. Lưu ý nếu khách nhập sai chính tả hãy sửa lại.
Nếu khách hàng hỏi về danh mục mà không có tên, hãy trả lời như dữ liệu có sẵn và hỏi lại khách cần tìm sản phẩm nào. Lưu ý nếu khách nhập sai chính tả hãy sửa lại.
Nếu khách hàng hỏi về các yêu cầu hỗ trợ, hãy trả lời các bước để hỗ trợ: bước 1 nhấp vào Hỗ trợ ở menu, bước 2: chọn mục cần hỗ trợ, bước 3: nhập thông tin cần hỗ trợ, và các yêu cầu sẽ được phản hồi trong 24 giờ kể từ khi gửi. (các yêu cầu hỡ trợ gồm đơn hàng, sản phẩm, tài khoản) 
Nếu khách hàng hỏi về các cửa hàng, hãy trả lời hãy chọn mục cửa hàng trên menu.
Nếu khách hỏi về cách đăng kí bán hàng, hãy trả lời các bước: b1 nhấp vào đăng kí bán hàng ở menu, bước 2 nhập các yêu cầu, b3 bấm đăng kí.
Nếu khách hỏi về phương thức thành toán thì trả lời có 2 phương thức là COD và Thanh toán online qua qr ngân hàng.

Nếu khách hàng hỏi về các mục khách không có ở trên, hãy trả lời shop hiện không hỗ trợ yêu cầu này.

Danh mục:
  - Danh mục có sẵn: [trang sức , giày  , áo thun  , Quần dài , Balo , Máy tính , Điện thoai , Đồ gia dụng , Đồ chơi trẻ em , Đồ điện tử ]


Khách hỏi: ${promt} 
Hãy phân tích và trả lời theo hướng dẫn:
- Hãy trả về JSON **thuần túy** đúng cấu trúc sau, không thêm ký tự Markdown (\`\`\`json hoặc \`\`\`):

{
  "message": "Câu trả lời thân thiện và giải thích ",
  "products": []
}
`

  const result = await model.generateContent(prompts);
  const text = result.response.text();

  try {
    return JSON.parse(text); // parse về object luôn
  } catch (e) {
    console.error("❌ Parse JSON lỗi:", text);
    return { message: text, products: [] }; // fallback
  }
}




  async detectIntent(prompt: string): Promise<any> {
  const model = this.genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

  const query = `
  Bạn là AI tư vấn bán hàng online.
  Phân tích câu hỏi sau của khách hàng: "${prompt}".

  Nhiệm vụ:
  - Xác định loại câu hỏi (intent):
    • "product_query" → hỏi về thông tin sản phẩm (giá, công dụng, còn hàng, mô tả…)
    • "product_quantity" → hỏi về số lượng / còn hàng không
    • "product_search" → tìm sản phẩm theo tên hoặc khoảng giá
    • "general" → các câu hỏi khác (ship, thanh toán, hỗ trợ…)
    



  - Trích xuất các thông tin nếu có:
    • "product": tên sản phẩm khách hỏi (ví dụ: "áo bomber nam", "serum dưỡng da"), nếu hỏi về tên danh mục thì không thêm ở đây mà để là null.
    • "category": danh mục nếu khách nhắc đến (ví dụ: "đồ điện tử", "quần áo") thì trả về theo id. có thể trả về tương tự, ví dụ khách nói áo thun nam thì có thể lấy theo id của áo thun.
    • "minprice" và "maxprice": nếu khách nói "từ 200k đến 500k" thì convert thành số nguyên: 200000 và 500000.
      + Nếu chỉ nói "tầm 500k trở xuống" → minprice = 0, maxprice = 500000
      + Nếu chỉ nói "trên 300k" → minprice = 300000, maxprice = null

  - Nếu khách nhập sai chính tả (vd "ihpone" → "iphone"), hãy tự động sửa lại tên trong phần "product".
  - Danh mục có sẵn: [trang sức có id là 1, giày có id là 2, áo thun có id là 3, Quần dài có id là 4, Balo có id là 5, Máy tính (là bao gồm các phụ kiện) có id là 6, Điện thoại (là bao gồm các phụ kiện hoặc điện thoại) có id là 7, Đồ gia dụng có id là 8, Đồ chơi trẻ em có id là 9, Đồ điện tử có id là 10]

  ⚠️ Chỉ trả về JSON hợp lệ theo mẫu sau:
  {
    "intent": "...",
    "product": "...",
    "category": "...",
    "minprice": 0 hoặc số,
    "maxprice": 0 hoặc số
  }
  Không thêm giải thích, không thêm ký tự thừa, hãy trả về JSON *thuần túy*, không bao gồm """json hoặc """ bất kỳ ký tự Markdown nào.
  `;

  const result = await model.generateContent(query);
  const text = result.response.text().trim();

  console.log('AI raw:', text);

  try {
    const data = JSON.parse(text);
    return data;
  } catch (e) {
    console.error('❌ Parse error:', text);
    return {
      intent: 'general',
      product: null,
      category: null,
      minprice: null,
      maxprice: null,
    };
  }
}


}
 