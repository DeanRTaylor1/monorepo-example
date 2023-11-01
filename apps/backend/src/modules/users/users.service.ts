import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { convertKeysToCamelCase } from '@monorepo-example/common';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    return this.usersRepository.create(
      convertKeysToCamelCase(createUserDto as any)
    );
  }

  async findAll() {
    return this.usersRepository.getAll({ skip: 0, limit: 10 });
  }

  async findOne(id: number) {
    return this.usersRepository.findById(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return this.usersRepository.destroyById(id);
  }
}
