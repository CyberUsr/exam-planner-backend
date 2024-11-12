import { Test, TestingModule } from '@nestjs/testing';
import { SaliService } from './sali.service';

describe('SaliService', () => {
  let service: SaliService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SaliService],
    }).compile();

    service = module.get<SaliService>(SaliService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
