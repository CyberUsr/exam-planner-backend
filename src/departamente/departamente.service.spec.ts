import { Test, TestingModule } from '@nestjs/testing';
import { DepartamenteService } from './departamente.service';

describe('DepartamenteService', () => {
  let service: DepartamenteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DepartamenteService],
    }).compile();

    service = module.get<DepartamenteService>(DepartamenteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
