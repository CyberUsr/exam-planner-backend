import { Test, TestingModule } from '@nestjs/testing';
import { DepartamenteController } from './departamente.controller';

describe('DepartamenteController', () => {
  let controller: DepartamenteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DepartamenteController],
    }).compile();

    controller = module.get<DepartamenteController>(DepartamenteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
