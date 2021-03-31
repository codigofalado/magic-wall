import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { MagicwallModule } from './magicwall/magicwall.module';
import { MagicwallService } from './magicwall/magicwall.service';
import { MagicwallGateway } from './magicwall/magicwall.gateway';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true,}), UserModule, MagicwallModule],
  controllers: [AppController],
  providers: [AppService, MagicwallService, MagicwallGateway],
})
export class AppModule {}
