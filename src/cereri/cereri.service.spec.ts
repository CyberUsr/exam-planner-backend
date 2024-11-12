import { Test, TestingModule } from '@nestjs/testing';
import { CereriService } from './cereri.service';

describe('CereriService', () => {
  let service: CereriService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CereriService],
    }).compile();

    service = module.get<CereriService>(CereriService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
