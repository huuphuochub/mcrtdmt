
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtSellerAuthGuardFromCookie implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {

    const request = context.switchToHttp().getRequest<Request>();
        const authHeader = request.headers['authorization'];

        const token = request.cookies?.['seller_token'];// tách 'Bearer xxx'

    if (!token) {
      console.log('toekn k ton tai');
      
      throw new UnauthorizedException({
  success: false,
  code: 'TOKEN_MISSING',
  message: 'Token không tồn tại',
});

    }

    try {
      const decoded = this.jwtService.verify(token);
      request['seller'] = decoded;
      return true;
    } catch {
      console.log('token k hop le');
      
      throw new UnauthorizedException({
  success: false,
  code: 'TOKEN_INVALID',
  message: 'Token không hợp lệ',
});

    }
  }
}

