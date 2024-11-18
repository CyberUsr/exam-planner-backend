import { Test, TestingModule } from '@nestjs/testing';
import { ExameneSaliController } from './examenesali.controller';

describe('ExamenesaliController', () => {
  let controller: ExameneSaliController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExameneSaliController],
    }).compile();

    controller = module.get<ExameneSaliController>(ExameneSaliController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
