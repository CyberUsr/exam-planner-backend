import { Test, TestingModule } from '@nestjs/testing';
import { ExameneService } from './examene.service';

describe('ExameneService', () => {
  let service: ExameneService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExameneService],
    }).compile();

    service = module.get<ExameneService>(ExameneService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
