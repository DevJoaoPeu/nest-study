import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateuserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { LogInterceptor } from 'src/interceptors/log.interceptor';
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
  async readOne(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Body() { email, name, password }: UpdateuserDto,
    @Param('id', ParseIntPipe) params,
  ) {
    return { user: { body: { email, name, password }, params } };
  }

  @UseInterceptors(LogInterceptor)
  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id) {
    return await this.userService.delete(id);
  }
}
