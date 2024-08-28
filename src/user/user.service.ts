import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { hash } from 'bcrypt';
import { UpdateuserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}
  async create({ email, name, password }: CreateUserDto) {
    password = await hash(password, 10);
    return await this.repository.save({ email, password, name });
  }

  async findOne(id: number) {
    await this.userAlredyExist(id);

    return await this.repository.findOne({
      where: { id },
    });
  }

  async findAll() {
    return await this.repository.find();
  }

  async delete(id: number) {
    await this.userAlredyExist(id);

    return await this.repository.delete(id);
  }
  async update(data: UpdateuserDto, id: number) {
    if (data.password) {
      data.password = await hash(data.password, 10);
    }
    if (data.email) {
      await this.emailAlredyInUse(data.email);
    }
    return this.repository.update(id, data);
  }

  async userAlredyExist(id: number) {
    const user = await this.repository.count({ where: { id } });

    if (!user) {
      throw new NotFoundException('User Not Found');
    }
  }

  async emailAlredyInUse(email: string) {
    const user = await this.repository.findOne({ where: { email } });

    if (user) {
      throw new ConflictException(`E-mail: ${email} já está em uso.`);
    }
  }
}
