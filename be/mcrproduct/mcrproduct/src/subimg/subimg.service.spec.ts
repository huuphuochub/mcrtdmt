import { Test, TestingModule } from '@nestjs/testing';
import { SubimgService } from './subimg.service';

describe('SubimgService', () => {
  let service: SubimgService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubimgService],
    }).compile();

    service = module.get<SubimgService>(SubimgService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
