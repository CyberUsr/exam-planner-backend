import { Test, TestingModule } from '@nestjs/testing';
import { CereriController } from './cereri.controller';

describe('CereriController', () => {
  let controller: CereriController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CereriController],
    }).compile();

    controller = module.get<CereriController>(CereriController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
