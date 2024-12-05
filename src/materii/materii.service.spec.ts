import { Test, TestingModule } from '@nestjs/testing';
import { MateriiService } from './materii.service';

describe('MateriiService', () => {
  let service: MateriiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MateriiService],
    }).compile();

    service = module.get<MateriiService>(MateriiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
