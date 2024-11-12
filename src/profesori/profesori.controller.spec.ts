import { Test, TestingModule } from '@nestjs/testing';
import { ProfesoriController } from './profesori.controller';

describe('ProfesoriController', () => {
  let controller: ProfesoriController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfesoriController],
    }).compile();

    controller = module.get<ProfesoriController>(ProfesoriController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
