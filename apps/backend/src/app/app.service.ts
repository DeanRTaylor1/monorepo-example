import { IUser } from '@monorepo-example/common';
import { Inject, Injectable } from '@nestjs/common';
import { EnvType } from '../modules/config/env.type';

@Injectable()
export class AppService {
  constructor(
    @Inject('AppConfig')
    private readonly appConfig: EnvType
  ) {}
  getData(): { message: string } {
    return { message: 'Hello api.' };
  }
}
