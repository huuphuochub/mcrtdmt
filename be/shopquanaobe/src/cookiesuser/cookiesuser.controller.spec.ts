import { Test, TestingModule } from '@nestjs/testing';
import { CookiesuserController } from './cookiesuser.controller';

describe('CookiesuserController', () => {
  let controller: CookiesuserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CookiesuserController],
    }).compile();

    controller = module.get<CookiesuserController>(CookiesuserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
