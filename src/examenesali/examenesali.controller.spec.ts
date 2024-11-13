import { Test, TestingModule } from '@nestjs/testing';
import { ExamenesaliController } from './examenesali.controller';

describe('ExamenesaliController', () => {
  let controller: ExamenesaliController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExamenesaliController],
    }).compile();

    controller = module.get<ExamenesaliController>(ExamenesaliController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
