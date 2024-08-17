import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { AuthRegisterDto } from './dto/auth-register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly JwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  async createToken(user: User) {
    return {
      acessToken: this.JwtService.sign(
        {
          id: user.id,
          email: user.email,
        },
        {
          expiresIn: '7 days',
          subject: String(user.id),
          issuer: 'API NestJS',
          audience: 'users',
        },
      ),
    };
  }

  async checkToken() {}

  async login(email: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
        password,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Email e/ou senha incorretos');
    }

    return await this.createToken(user);
  }

  async forget(email: string) {
    const user = this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Email está incorreto');
    }

    //Enviar o e-mail

    return true;
  }

  async reset(password: string, token: string) {
    //extrai id do token
    const id = 0;

    const user = await this.prisma.user.update({
      where: { id },
      data: { password },
    });

    return await this.createToken(user);
  }

  async register(data: AuthRegisterDto) {
    const user = await this.userService.create(data);

    return await this.createToken(user);
  }
}
