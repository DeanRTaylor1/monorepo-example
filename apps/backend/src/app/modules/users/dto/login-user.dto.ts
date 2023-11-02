import { IsString, IsNotEmpty } from "@nestjs/class-validator";
import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { User } from "../entities/user.entity";
import { IsOptional } from "class-validator";

export class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @ApiHideProperty()
  @IsOptional()
  user?: User;
}
