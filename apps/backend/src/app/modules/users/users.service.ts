import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UsersRepository } from "./users.repository";
import { ToCamel } from "@monorepo-example/common";

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async create(createUserDto: ToCamel<CreateUserDto>) {
    return this.usersRepository.create(createUserDto);
  }

  async findAll() {
    return this.usersRepository.getAll({ skip: 0, limit: 10 });
  }

  async findOne(id: number) {
    return this.usersRepository.findById(id);
  }

  async findByEmail(email: string) {
    return this.usersRepository.findByEmail(email);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return this.usersRepository.destroyById(id);
  }
}
