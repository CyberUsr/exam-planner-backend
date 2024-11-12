import { Test, TestingModule } from '@nestjs/testing';
import { ProfesoriService } from './profesori.service';

describe('ProfesoriService', () => {
  let service: ProfesoriService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfesoriService],
    }).compile();

    service = module.get<ProfesoriService>(ProfesoriService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
