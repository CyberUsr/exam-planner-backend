import { Test, TestingModule } from '@nestjs/testing';
import { StudentiService } from './studenti.service';

describe('StudentiService', () => {
  let service: StudentiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentiService],
    }).compile();

    service = module.get<StudentiService>(StudentiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
