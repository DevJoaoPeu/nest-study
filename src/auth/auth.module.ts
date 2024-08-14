import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: 'urjsi8du7f8hfjfon',
    }),
  ],
  controllers: [AuthController],
  exports: [],
  providers: [],
})
export class AuthModule {}
