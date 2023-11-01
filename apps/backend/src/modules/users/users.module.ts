import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./entities/user.entity";
import { UsersRepository } from "./users.repository";
import { ComparePasswordPipe } from "../../app/pipes/compare-password.pipe";

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, ComparePasswordPipe],
  imports: [SequelizeModule.forFeature([User])],
  exports: [SequelizeModule.forFeature([User])],
})
export class UsersModule {}
