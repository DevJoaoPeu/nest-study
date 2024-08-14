import { Body, Controller, Post } from '@nestjs/common';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { AuthForgetDto } from './dto/auth-forget.dto';
import { AuthResetDto } from './dto/auth-reset.dto';

@Controller('auth')
export class AuthController {
  @Post('login')
  async login(@Body() body: AuthLoginDto) {}

  @Post('register')
  async register(@Body() body: AuthRegisterDto) {}

  @Post('forget')
  async forget(@Body() body: AuthForgetDto) {}

  @Post('reset')
  async reset(@Body() body: AuthResetDto) {}
}
