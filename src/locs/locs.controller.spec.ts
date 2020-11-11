import { Test, TestingModule } from '@nestjs/testing';
import { LocsController } from './locs.controller';

describe('LocsController', () => {
  let controller: LocsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocsController],
    }).compile();

    controller = module.get<LocsController>(LocsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
