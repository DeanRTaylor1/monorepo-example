import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { scryptAsync } from "../../../utils/encryption";
import { env } from "../config/env";

import { randomBytes } from "crypto";
import * as jwt from "jsonwebtoken";
import { JwtProps } from "./types/auth.types";
import { promisify } from "util";
import { JwtService } from "@nestjs/jwt";
import { User } from "../users/entities/user.entity";

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  private verify = promisify(jwt.verify);

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
  }: {
    userId: number;
    email: string;
  }): Promise<{ accessToken: string }> {
    const payload = { sub: userId, email };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
