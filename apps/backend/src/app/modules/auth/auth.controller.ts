import { Controller, Post, Body, UsePipes } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ComparePasswordPipe } from "../../pipes/compare-password.pipe";
import { LoginUserDto } from "../users/dto/login-user.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  @UsePipes(ComparePasswordPipe)
  async login(
    @Body() { user }: LoginUserDto
  ): Promise<{ accessToken: string }> {
    const { id: userId, email } = user;
    const { accessToken } = await this.authService.signIn({ userId, email });

    return { accessToken };
  }
}
