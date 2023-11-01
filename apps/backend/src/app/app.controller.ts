import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';
import { SnakeCaseObj } from '@monorepo-example/common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/health')
  getHealthStatus(): SnakeCaseObj<{ message: string }> {
    return this.appService.getHealth();
  }
}
