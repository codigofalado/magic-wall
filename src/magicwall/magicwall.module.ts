import { Module } from '@nestjs/common';
import { MagicwallService } from './magicwall.service';

@Module({
  providers: [MagicwallService]
})
export class MagicwallModule {
}
