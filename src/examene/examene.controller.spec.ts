import { Test, TestingModule } from '@nestjs/testing';
import { ExameneController } from './examene.controller';

describe('ExameneController', () => {
  let controller: ExameneController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExameneController],
    }).compile();

    controller = module.get<ExameneController>(ExameneController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
