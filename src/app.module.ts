import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DepartmentModule } from './department/department.module';

@Module({
  imports: [TypeOrmModule.forRoot(), UserModule, AuthModule, DepartmentModule],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
