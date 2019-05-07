import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CryptoUtil } from '../utils/crypto.util';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController, CryptoUtil],
  providers: [UserService],
})
export class UserModule {}
