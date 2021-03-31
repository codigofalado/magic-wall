import { Test, TestingModule } from '@nestjs/testing';
import { MagicwallGateway } from './magicwall.gateway';

describe('MagicwallGateway', () => {
  let gateway: MagicwallGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MagicwallGateway],
    }).compile();

    gateway = module.get<MagicwallGateway>(MagicwallGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
