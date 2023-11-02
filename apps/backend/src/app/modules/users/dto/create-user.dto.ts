import { ICreateAttributes, IUser, ToSnake } from "@monorepo-example/common";
import { RoleEnum, UserStatusEnum } from "../user.enum";

import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsOptional,
  IsEnum,
} from "@nestjs/class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto implements ToSnake<ICreateAttributes<IUser>> {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  first_name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  last_name: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsEnum(() => UserStatusEnum)
  @IsOptional()
  status: UserStatusEnum;

  @ApiProperty()
  @IsEnum(() => RoleEnum)
  @IsOptional()
  role: RoleEnum;
}
