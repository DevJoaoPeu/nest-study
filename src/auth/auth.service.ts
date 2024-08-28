import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { AuthRegisterDto } from './dto/auth-register.dto';
import { compare, hash } from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly JwtService: JwtService,
    private readonly userService: UserService,
    private readonly mailer: MailerService,
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  async createToken(user) {
    return {
      acessToken: this.JwtService.sign(
        {
          id: user.id,
          email: user.email,
        },
        {
          expiresIn: '1 day',
          subject: String(user.id),
          issuer: 'login',
          audience: 'users',
        },
      ),
    };
  }

  async checkToken(token: string) {
    try {
      const data = await this.JwtService.verify(token);

      return data;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  async login(email: string, password: string) {
    const user = await this.repository.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Email e/ou senha incorretos');
    }

    if (!(await compare(password, user.password))) {
      throw new UnauthorizedException('Email e/ou senha incorretos');
    }

    return await this.createToken(user);
  }

  async forget(email: string) {
    const user = await this.repository.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Email está incorreto');
    }

    const token = await this.JwtService.sign(
      {
        id: user.id,
      },
      {
        expiresIn: '30 minutes',
        subject: String(user.id),
        issuer: 'forget',
        audience: 'users',
      },
    );

    await this.mailer.sendMail({
      subject: 'Recuperação de senha',
      to: 'joaocanaldroido@gmail.com',
      template: 'forget',
      context: {
        name: user.name,
        token,
      },
    });

    return true;
  }

  async reset(password: string, token: string) {
    try {
      const data: any = await this.JwtService.verify(token, {
        issuer: 'forget',
        audience: 'users',
      });

      password = await hash(password, 10);

      const user = await this.repository.update(data.id, { password });

      return await this.createToken(user);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async register(data: AuthRegisterDto) {
    const user = await this.userService.create(data);

    return await this.createToken(user);
  }
}
