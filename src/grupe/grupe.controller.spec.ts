import { Test, TestingModule } from '@nestjs/testing';
import { GrupeController } from './grupe.controller';

describe('GrupeController', () => {
  let controller: GrupeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GrupeController],
    }).compile();

    controller = module.get<GrupeController>(GrupeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
