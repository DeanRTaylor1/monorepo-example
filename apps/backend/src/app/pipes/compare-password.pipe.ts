import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
  UnauthorizedException,
} from "@nestjs/common";
import { UsersService } from "../modules/users/users.service";
import { LoginUserDto } from "../modules/users/dto/login-user.dto";
import { AuthService } from "../modules/auth/auth.service";

@Injectable()
export class ComparePasswordPipe implements PipeTransform {
  constructor(
    private readonly usersService: UsersService,
    private authService: AuthService
  ) {}

  async transform(value: LoginUserDto, _metadata: ArgumentMetadata) {
    const { email, password } = value;

    if (!password || !email) {
      throw new BadRequestException(
        "Password and username fields are required"
      );
    }

    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new BadRequestException("User not found");
    }

    const isMatch = await this.authService.compare({
      storedPassword: user.password,
      suppliedPassword: password,
    });

    if (!isMatch) {
      throw new UnauthorizedException("Incorrect password");
    }

    return { ...value, password: user.password, user };
  }
}
