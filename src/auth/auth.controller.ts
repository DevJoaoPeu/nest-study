import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { AuthForgetDto } from './dto/auth-forget.dto';
import { AuthResetDto } from './dto/auth-reset.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { User } from 'src/decorators/user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { writeFile } from 'fs/promises';
import { join } from 'path';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authServive: AuthService,
  ) {}
  @Post('login')
  async login(@Body() { email, password }: AuthLoginDto) {
    return this.authServive.login(email, password);
  }

  @Post('register')
  async register(@Body() body: AuthRegisterDto) {
    return this.authServive.register(body);
  }

  @Post('forget')
  async forget(@Body() { email }: AuthForgetDto) {
    return this.authServive.forget(email);
  }

  @Post('reset')
  async reset(@Body() { password, token }: AuthResetDto) {
    return this.authServive.reset(password, token);
  }

  @UseGuards(AuthGuard)
  @Post('me')
  async me(@User('i') user) {
    return { user };
  }

  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  @Post('photo')
  async uploadPhoto(@UploadedFile() photo: Express.Multer.File) {
    const result = await writeFile(
      join(__dirname, '..', '..', 'storage', 'photos', 'photo-128791.png'),
      photo.buffer,
    );
    return { result };
  }
}
