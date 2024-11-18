import { Test, TestingModule } from '@nestjs/testing';
import { CererilegaturaService } from './cererilegatura.service';

describe('CererilegaturaService', () => {
  let service: CererilegaturaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CererilegaturaService],
    }).compile();

    service = module.get<CererilegaturaService>(CererilegaturaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
