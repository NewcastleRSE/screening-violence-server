import { Test, TestingModule } from '@nestjs/testing';
import { LocsService } from './locs.service';

describe('LocsService', () => {
  let service: LocsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocsService],
    }).compile();

    service = module.get<LocsService>(LocsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
