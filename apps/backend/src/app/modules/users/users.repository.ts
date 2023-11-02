import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { BaseRepository } from "../base/base.repository";
import { ICreateAttributes } from "@monorepo-example/common";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersRepository extends BaseRepository<User> {
  constructor(
    @InjectModel(User)
    userModel: typeof User
  ) {
    super(userModel);
  }

  async create(data: ICreateAttributes<User>): Promise<User> {
    return this.model.create(data);
  }

  async findByEmail(email: string): Promise<User> {
    return this.model.findOne({ where: { email } });
  }
}
