import { Test, TestingModule } from '@nestjs/testing';
import { CererilegaturaController } from './cererilegatura.controller';

describe('CererilegaturaController', () => {
  let controller: CererilegaturaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CererilegaturaController],
    }).compile();

    controller = module.get<CererilegaturaController>(CererilegaturaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
