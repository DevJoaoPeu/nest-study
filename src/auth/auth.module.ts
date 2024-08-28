import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { AuthService } from './auth.service';
import { MulterModule } from 'src/multer/multer.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entity/user.entity';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
    forwardRef(() => UserModule),
    MulterModule,
    TypeOrmModule.forFeature([UserEntity]),
  ],
  controllers: [AuthController],
  exports: [AuthService],
  providers: [AuthService],
})
export class AuthModule {}
