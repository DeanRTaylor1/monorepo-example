import { IUser } from '@monorepo-example/common';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getData(): { user: IUser } {
    const user: IUser = {
      email: 'email1@email.com',
      username: 'username',
      hashedPassword: 'hashedPassword',
    };
    return { user };
  }
}
