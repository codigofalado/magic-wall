import { Controller, Get, Param, Render } from '@nestjs/common';
import { MagicwallService } from './magicwall/magicwall.service';

@Controller()
export class AppController {
  
  constructor(private readonly magicwallService: MagicwallService) {}

  @Get()
  @Render('index')
  getTest(): object {
    return {message: this.magicwallService.getTest()};
  }
}
