import { Test, TestingModule } from '@nestjs/testing';
import { MagicwallService } from './magicwall.service';

describe('MagicwallService', () => {
  let service: MagicwallService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MagicwallService],
    }).compile();

    service = module.get<MagicwallService>(MagicwallService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
