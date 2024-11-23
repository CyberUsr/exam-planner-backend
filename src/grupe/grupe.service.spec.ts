import { Test, TestingModule } from '@nestjs/testing';
import { GrupeService } from './grupe.service';

describe('GrupeService', () => {
  let service: GrupeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GrupeService],
    }).compile();

    service = module.get<GrupeService>(GrupeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
