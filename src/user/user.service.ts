import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { hash } from 'bcrypt';
import { UpdateuserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor() {}
  async create({ email, name, password }: CreateUserDto) {
    password = await hash(password, 10);
    return await this.prisma.user.create({
      data: { email, name, password },
    });
  }

  async findOne(id: number) {
    await this.userAlredyExist(id);

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
  async update(data: UpdateuserDto, id: number) {
    if (data.password) {
      data.password = await hash(data.password, 10);
    }
    if (data.email) {
      await this.emailAlredyInUse(data.email);
    }
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async userAlredyExist(id: number) {
    const user = await this.prisma.user.count({ where: { id } });

    if (!user) {
      throw new NotFoundException('User Not Found');
    }
  }

  async emailAlredyInUse(email: string) {
    const user = await this.prisma.user.findFirst({ where: { email } });

    if (user) {
      throw new ConflictException(`E-mail: ${email} já está em uso.`);
    }
  }
}
