import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';
import {
  IUser,
  SnakeCaseObj,
  convertKeysToSnakeCase,
} from '@monorepo-example/common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData(): SnakeCaseObj<IUser> {
    return convertKeysToSnakeCase(this.appService.getData());
  }
}
