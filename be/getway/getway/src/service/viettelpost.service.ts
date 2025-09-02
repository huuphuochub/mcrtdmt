import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import * as path from 'path';
import { lastValueFrom } from 'rxjs';
import * as fs from 'fs';


@Injectable()
export class ViettelpostService {
    private readonly filePath = path.join(__dirname, '../../viettel-token.json');

  constructor(private readonly httpService: HttpService) {

  }
  // lấy tokn của viettel
  async getTokenviettel (){
    const url = 'https://partner.viettelpost.vn/v2/user/Login';

    const body = {
        USERNAME: process.env.VIETTEL_USERNAME,
        PASSWORD: process.env.VIETTEL_PASSWORD,
    }
    // console.log(body);
    
    try {
        const response = await lastValueFrom(
      this.httpService.post(url, body, {
        headers: { 'Content-Type': 'application/json' },
      }),
    );
            // console.log(response);

        // console.log(response.data);
        
        const tokendata = {
            token:response.data.data.token,
            create: Date.now()
        }

        fs.writeFileSync(this.filePath, JSON.stringify(tokendata, null, 2));

        return response.data.data.token; 
    } catch (error) {
        console.log(
          'Lỗi khi lấy token Viettel:', error.message
        );
        
    }
  }

          async  getToken() {
            if (!fs.existsSync(this.filePath)) {
                return null;
            }

            const data = fs.readFileSync(this.filePath, 'utf8');

            if (!data) {
                return null; // file rỗng
            }

            try {
                return JSON.parse(data);
            } catch (error) {
                console.error('File JSON bị lỗi:', error);
                return null;
            }
            }

}