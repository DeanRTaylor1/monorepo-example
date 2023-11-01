import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from "@nestjs/common";
import { BinaryLike, randomBytes, scrypt } from "crypto";
import { promisify } from "util";

const scryptAsync: (
  arg1: BinaryLike,
  arg2: BinaryLike,
  arg3: number
) => Promise<Buffer> = promisify(scrypt);

@Injectable()
export class HashPasswordPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    if (!value.password) {
      throw new BadRequestException("Password field is required");
    }

    const hashedPassword = await this.hashPassword(value.password);
    return {
      ...value,
      password: hashedPassword,
    };
  }

  async hashPassword(password: string): Promise<string> {
    const salt = randomBytes(8).toString("hex");
    const derivedKey = await scryptAsync(password, salt, 64);
    return `${derivedKey.toString("hex")}.${salt}`;
  }
}
