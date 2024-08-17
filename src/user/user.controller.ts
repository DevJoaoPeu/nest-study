import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateuserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { LogInterceptor } from 'src/interceptors/log.interceptor';
import { ParamId } from 'src/decorators/param-id.decorator';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enuns/role.enum';
import { RoleGuard } from 'src/guards/role.guard';
import { AuthGuard } from 'src/guards/auth.guard';

@Roles(Role.Admin)
@UseGuards(AuthGuard, RoleGuard)
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
  async update(@Body() data: UpdateuserDto, @ParamId() id: number) {
    return this.userService.update(data, id);
  }

  @UseInterceptors(LogInterceptor)
  @Delete(':id')
  async deleteUser(@ParamId() id) {
    return await this.userService.delete(id);
  }
}
