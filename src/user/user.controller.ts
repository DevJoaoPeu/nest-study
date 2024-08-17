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

@UseGuards(AuthGuard, RoleGuard)
@UseInterceptors(LogInterceptor)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(Role.Admin)
  @Post()
  async create(@Body() { name, email, password }: CreateUserDto) {
    return await this.userService.create({ name, email, password });
  }

  @Roles(Role.Admin)
  @Get()
  async readAll() {
    return await this.userService.findAll();
  }

  @Roles(Role.Admin, Role.User)
  @Get(':id')
  async readOne(@ParamId() id) {
    return await this.userService.findOne(id);
  }

  @Roles(Role.Admin)
  @Patch(':id')
  async update(
    @Body() { email, name, password }: UpdateuserDto,
    @ParamId() id,
  ) {
    return { user: { body: { email, name, password }, id } };
  }

  @Roles(Role.Admin)
  @UseInterceptors(LogInterceptor)
  @Delete(':id')
  async deleteUser(@ParamId() id) {
    return await this.userService.delete(id);
  }
}
