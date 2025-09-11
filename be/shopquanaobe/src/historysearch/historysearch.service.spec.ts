import { Test, TestingModule } from '@nestjs/testing';
import { HistorysearchService } from './historysearch.service';

describe('HistorysearchService', () => {
  let service: HistorysearchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HistorysearchService],
    }).compile();

    service = module.get<HistorysearchService>(HistorysearchService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
