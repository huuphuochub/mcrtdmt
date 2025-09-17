import { Test, TestingModule } from '@nestjs/testing';
import { CookiesuserService } from './cookiesuser.service';

describe('CookiesuserService', () => {
  let service: CookiesuserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CookiesuserService],
    }).compile();

    service = module.get<CookiesuserService>(CookiesuserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
