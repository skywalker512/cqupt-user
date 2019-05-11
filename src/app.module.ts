import { Module, Global } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DepartmentModule } from './department/department.module';
import { CardModule } from './card/card.module';

@Module({
  imports: [TypeOrmModule.forRoot(), UserModule, AuthModule, DepartmentModule, CardModule],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
