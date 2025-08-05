import { Test, TestingModule } from '@nestjs/testing';
import { SubimgController } from './subimg.controller';

describe('SubimgController', () => {
  let controller: SubimgController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubimgController],
    }).compile();

    controller = module.get<SubimgController>(SubimgController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
