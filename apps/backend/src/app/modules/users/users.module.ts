import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./entities/user.entity";
import { UsersRepository } from "./users.repository";
import { ComparePasswordPipe } from "../../pipes/compare-password.pipe";
import { AuthService } from "../auth/auth.service";
import { AuthModule } from "../auth/auth.module";

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, ComparePasswordPipe, AuthService],
  imports: [SequelizeModule.forFeature([User]), AuthModule],
  exports: [SequelizeModule.forFeature([User]), UsersService, UsersRepository],
})
export class UsersModule {}
