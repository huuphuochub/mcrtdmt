import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuardFromCookie implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {

    const request = context.switchToHttp().getRequest<Request>();
        const authHeader = request.headers['authorization'];

        const token = authHeader?.split(' ')[1]; // tách 'Bearer xxx'

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
      request['user'] = decoded;
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
