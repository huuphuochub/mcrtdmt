import { Test, TestingModule } from '@nestjs/testing';
import { HistorysearchController } from './historysearch.controller';

describe('HistorysearchController', () => {
  let controller: HistorysearchController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HistorysearchController],
    }).compile();

    controller = module.get<HistorysearchController>(HistorysearchController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
