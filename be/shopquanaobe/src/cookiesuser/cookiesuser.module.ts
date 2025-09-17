import { Module } from '@nestjs/common';
import { CookiesuserService } from './cookiesuser.service';

@Module({
  providers: [CookiesuserService]
})
export class CookiesuserModule {}
