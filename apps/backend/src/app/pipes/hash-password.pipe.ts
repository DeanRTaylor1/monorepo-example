import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from "@nestjs/common";
import { BinaryLike, randomBytes, scrypt } from "crypto";
import { promisify } from "util";
import { AuthService } from "../modules/auth/auth.service";

@Injectable()
export class HashPasswordPipe implements PipeTransform {
  constructor(private authService: AuthService) {}
  async transform(value: any, _metadata: ArgumentMetadata) {
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
