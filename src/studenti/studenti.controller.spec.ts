import { Test, TestingModule } from '@nestjs/testing';
import { StudentiController } from './studenti.controller';

describe('StudentiController', () => {
  let controller: StudentiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentiController],
    }).compile();

    controller = module.get<StudentiController>(StudentiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
