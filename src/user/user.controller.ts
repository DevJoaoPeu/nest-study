import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  @Post()
  async create(@Body() body: CreateUserDto) {
    return body;
  }

  @Get()
  async readAll() {
    return { users: [] };
  }

  @Get(':id')
  async readOne(@Param() params) {
    return { user: { params } };
  }

  @Patch(':id')
  async update(@Body() body: Partial<CreateUserDto>, @Param() params) {
    return { user: { body, params } };
  }

  @Delete(':id')
  async deleteUser(@Param() params) {
    return { params };
  }
}
