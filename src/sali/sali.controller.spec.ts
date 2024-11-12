import { Test, TestingModule } from '@nestjs/testing';
import { SaliController } from './sali.controller';

describe('SaliController', () => {
  let controller: SaliController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SaliController],
    }).compile();

    controller = module.get<SaliController>(SaliController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
