import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async create({ email, name, password }: CreateUserDto) {
    return await this.prisma.user.create({
      data: { email, name, password },
    });
  }

  async findOne(id: number) {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async delete(id: number) {
    await this.userAlredyExist(id);

    return await this.prisma.user.delete({ where: { id } });
  }

  async userAlredyExist(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException('User Not Found');
    }
  }
}
