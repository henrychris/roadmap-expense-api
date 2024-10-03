import { Controller, Post, Body } from '@nestjs/common';
import { SignupRequest } from './dto/signup-request-dto';
import { AuthService } from './auth.service';
import { LoginRequest } from './dto/login-request-dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signup')
  async signup(@Body() signupRequest: SignupRequest) {
    return await this.authService.signupAsync(signupRequest);
  }

  @Post('login')
  async login(@Body() loginRequest: LoginRequest) {
    return await this.authService.loginAsync(loginRequest);
  }
}
