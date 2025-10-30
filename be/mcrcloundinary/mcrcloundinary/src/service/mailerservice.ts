    import { Injectable } from '@nestjs/common';
    import { MailerService } from '@nestjs-modules/mailer';
    import { generateOtpEmail } from '../templates/codemail';

    @Injectable()
    export class MailService {
      constructor(private readonly mailerService: MailerService) {}

      async sendConfirmationEmail(body:any) {
  const data = body.body; // unwrap ra
        

         const htmlTemplate = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <title>Order Confirmation</title>
        <style>
          img { max-width: 100%; height: auto; }
          table { border-collapse: collapse; }
          @media only screen and (max-width: 600px) {
            .container { width: 100% !important; }
            .product-table th, .product-table td { display: block; width: 100% !important; }
          }
        </style>
      </head>
      <body style="font-family: Arial, sans-serif; background-color:#f6f6f6; margin:0; padding:20px;">
        <table align="center" width="600" class="container" cellpadding="0" cellspacing="0" 
               style="background:#ffffff; border-radius:8px; overflow:hidden; max-width:600px;">
          <tr>
            <td style="background:#4CAF50; color:white; padding:20px; text-align:center; font-size:20px;">
              Cảm ơn bạn đã đặt hàng!
            </td>
          </tr>
          <tr>
            <td style="padding:20px;">
              <h3>Thông tin khách hàng</h3>
              <p><strong>Tên:</strong> ${data.customerName ?? ''}</p>
              <p><strong>Email:</strong> ${data.customerEmail}</p>
              <p><strong>Ngày đặt:</strong> ${data.orderDate}</p>
            </td>
          </tr>
          <tr>
            <td style="padding:20px;">
              <h3>Chi tiết đơn hàng</h3>
              <table class="product-table" width="100%" cellpadding="10" cellspacing="0" border="1">
                <thead style="background:#f0f0f0;">
                  <tr><th>Ảnh</th><th>Tên sản phẩm</th><th>Giá</th></tr>
                </thead>
                <tbody>
                  ${data.products.map((p) => `
                    <tr>
                      <td style="text-align:center;">
                        <img src="${p.image}" width="80" style="border-radius:4px;" />
                      </td>
                      <td>${p.name}</td>
                      <td style="white-space:nowrap;">${p.price}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:20px; text-align:right; font-size:18px;">
              <strong>Tổng cộng: ${data.totalPrice}</strong>
            </td>
          </tr>
          <tr>
            <td style="padding:20px; text-align:center;">
              <a href="${data.redirectUrl}" 
                 style="display:inline-block; padding:14px 28px; background:#4CAF50; color:#fff; text-decoration:none; border-radius:5px; font-weight:bold; font-size:16px;">
                Xem đơn hàng
              </a>
            </td>
          </tr>
          <tr>
            <td style="background:#f0f0f0; padding:15px; text-align:center; font-size:12px; color:#666;">
              © 2025 Your Shop. All rights reserved.
            </td>
          </tr>
        </table>
      </body>
    </html>`;
        await this.mailerService.sendMail({
          to: data.customerEmail,
          subject: 'Confirm your email',
          html: htmlTemplate, // Name of your template file (e.g., confirmation.hbs)
          context: {
            customerName: data.customerName,
            customerEmail: data.customerEmail,
            orderDate:data.orderDate,
            products:data.products,
            totalPrice:data.totalPrice,
            redirectUrl:data.redirectUrl,
            
          },
        });
      }

      async sendOtpEmail(email: string, code: string) { 
        // const { generateOtpEmail } = await import('../templates/codemail');
        const htmlContent = generateOtpEmail(code); 
        await this.mailerService.sendMail({
          to: email,
          subject: 'Mã xác thực OTP của bạn',
          html: htmlContent,
        });
      }
    }