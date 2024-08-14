import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateuserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { LogInterceptor } from 'src/interceptors/log.interceptor';
import { ParamId } from 'src/decorators/param-id.decorator';
@UseInterceptors(LogInterceptor)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() { name, email, password }: CreateUserDto) {
    return await this.userService.create({ name, email, password });
  }

  @Get()
  async readAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  async readOne(@ParamId() id) {
    return await this.userService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Body() { email, name, password }: UpdateuserDto,
    @ParamId() id,
  ) {
    return { user: { body: { email, name, password }, id } };
  }

  @UseInterceptors(LogInterceptor)
  @Delete(':id')
  async deleteUser(@ParamId() id) {
    return await this.userService.delete(id);
  }
}
