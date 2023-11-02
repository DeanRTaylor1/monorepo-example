import { Injectable } from "@nestjs/common";
import { scryptAsync } from "../../../utils/encryption";

import { randomBytes } from "crypto";
import { JwtService } from "@nestjs/jwt";
import { RoleEnum } from "../users/user.enum";

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  public async hashPassword(password: string): Promise<string> {
    const salt = randomBytes(8).toString("hex");
    const derivedKey = await scryptAsync(password, salt, 64);
    return `${derivedKey.toString("hex")}.${salt}`;
  }

  public async compare({
    storedPassword,
    suppliedPassword,
  }: {
    storedPassword: string;
    suppliedPassword: string;
  }): Promise<boolean> {
    const [hashedPassword, salt] = storedPassword.split(".");
    const derivedKey = await scryptAsync(suppliedPassword, salt, 64);
    return derivedKey.toString("hex") === hashedPassword;
  }

  public async signIn({
    userId,
    email,
    role,
  }: {
    userId: number;
    email: string;
    role: RoleEnum;
  }): Promise<{ accessToken: string }> {
    const payload = { sub: userId, email, role };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
