import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly JwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async createToken() {
    //return this.JwtService.sign();
  }

  async checkToken(token: string) {
    //return this.JwtService.verify(token);
  }

  async login(email: string, password: string) {
    const user = this.prisma.user.findFirst({
      where: {
        email,
        password,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Email e/ou senha incorretos');
    }
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

    await this.prisma.user.update({
      where: { id },
      data: { password },
    });

    return true;
  }
}
