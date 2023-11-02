import { Module, forwardRef } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UsersModule } from "../users/users.module";
import { HashPasswordPipe } from "../../pipes/hash-password.pipe";

import { JwtModule } from "@nestjs/jwt";
import { env } from "../config/env";

@Module({
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      global: true,
      secret: env.auth.jwtSecret,
      signOptions: { expiresIn: env.auth.expiresIn },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, HashPasswordPipe],
  exports: [AuthService],
})
export class AuthModule {}
