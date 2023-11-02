import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  UseGuards,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ApiBody, ApiResponse } from "@nestjs/swagger";
import { User } from "./entities/user.entity";
import { HashPasswordPipe } from "../../pipes/hash-password.pipe";
import { BodyToCamelCase } from "../../decorators/body-to-camel.decorator";
import { ToCamel } from "@monorepo-example/common";
import { AuthGuard } from "../auth/auth.guard";
import { Public } from "../../decorators/public-route.decorator";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    type: User,
    description: "Create a user",
  })
  @UsePipes(HashPasswordPipe)
  async create(@BodyToCamelCase() body: ToCamel<CreateUserDto>): Promise<User> {
    console.log({ body });
    return await this.usersService.create(body);
  }

  @Get()
  @Public()
  @ApiResponse({
    status: 200,
    type: Array<User>,
    description: "List all users",
  })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(":id")
  @Public()
  @ApiResponse({
    status: 200,
    type: User,
    description: "Find one user by id.",
  })
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
}
