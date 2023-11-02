import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ApiBody, ApiResponse } from "@nestjs/swagger";
import { User } from "./entities/user.entity";
import { HashPasswordPipe } from "../../pipes/hash-password.pipe";
import { LoginUserDto } from "./dto/login-user.dto";
import { ComparePasswordPipe } from "../../pipes/compare-password.pipe";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 20,
    type: User,
    description: "Create a user",
  })
  @UsePipes(new HashPasswordPipe())
  async create(@Body() body: CreateUserDto): Promise<User> {
    return await this.usersService.create(body);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.usersService.remove(+id);
  }

  @Post("login")
  @UsePipes(ComparePasswordPipe)
  async login(@Body() loginDetails: LoginUserDto): Promise<{ token: string }> {
    return { token: "success" };
  }
}
