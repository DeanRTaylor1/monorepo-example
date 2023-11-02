import { Controller, Post, Body, UsePipes } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ComparePasswordPipe } from "../../pipes/compare-password.pipe";
import { LoginUserDto } from "../users/dto/login-user.dto";
import { Public } from "../../decorators/public-route.decorator";
import { RoleEnum } from "../users/user.enum";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  @UsePipes(ComparePasswordPipe)
  @Public()
  async login(
    @Body() { user }: LoginUserDto
  ): Promise<{ accessToken: string }> {
    const { id: userId, email, role } = user;
    const { accessToken } = await this.authService.signIn({
      userId,
      email,
      role: role as RoleEnum,
    });

    return { accessToken };
  }
}
