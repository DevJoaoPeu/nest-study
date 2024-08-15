import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [
    JwtModule.register({
      secret: '',
    }),
    UserModule,
    PrismaModule,
  ],
  controllers: [AuthController],
  exports: [],
  providers: [],
})
export class AuthModule {}
