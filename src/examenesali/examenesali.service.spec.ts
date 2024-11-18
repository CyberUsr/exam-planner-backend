import { Test, TestingModule } from '@nestjs/testing';
import { ExameneSaliService } from './examenesali.service';

describe('ExameneSaliService', () => {
  let service: ExameneSaliService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExameneSaliService],
    }).compile();

    service = module.get<ExameneSaliService>(ExameneSaliService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
