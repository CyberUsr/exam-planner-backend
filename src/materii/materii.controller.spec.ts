import { Test, TestingModule } from '@nestjs/testing';
import { MateriiController } from './materii.controller';

describe('MateriiController', () => {
  let controller: MateriiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MateriiController],
    }).compile();

    controller = module.get<MateriiController>(MateriiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
