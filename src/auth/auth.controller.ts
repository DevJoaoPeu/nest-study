import { Body, Controller, Post } from '@nestjs/common';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { AuthForgetDto } from './dto/auth-forget.dto';
import { AuthResetDto } from './dto/auth-reset.dto';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}
  @Post('login')
  async login(@Body() body: AuthLoginDto) {}

  @Post('register')
  async register(@Body() body: AuthRegisterDto) {
    return this.userService.create(body);
  }

  @Post('forget')
  async forget(@Body() body: AuthForgetDto) {}

  @Post('reset')
  async reset(@Body() body: AuthResetDto) {}
}
