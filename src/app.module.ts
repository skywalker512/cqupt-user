import { Module, Global } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DepartmentModule } from './department/department.module';
import { CardModule } from './card/card.module';

import { Card } from './card/card.entity';
import { Department } from './department/department.entity';
import { User } from './user/user.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    keepConnectionAlive: true,
    type: "postgres",
    host: "postgres",
    port: 5432,
    username: "postgres",
    database: "cqupt_user",
    entities: [Card, Department, User],
    synchronize: true
  }), UserModule, AuthModule, DepartmentModule, CardModule],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
