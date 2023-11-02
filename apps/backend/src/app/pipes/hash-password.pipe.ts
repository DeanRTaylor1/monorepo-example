import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from "@nestjs/common";
import { AuthService } from "../modules/auth/auth.service";
import { LoginUserDto } from "../modules/users/dto/login-user.dto";

@Injectable()
export class HashPasswordPipe implements PipeTransform {
  constructor(private authService: AuthService) {}
  async transform(value: LoginUserDto, _metadata: ArgumentMetadata) {
    if (!value.password) {
      throw new BadRequestException("Password field is required");
    }

    const hashedPassword = await this.authService.hashPassword(value.password);
    return {
      ...value,
      password: hashedPassword,
    };
  }
}
