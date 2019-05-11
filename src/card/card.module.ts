import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { Card } from './card.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardController } from './card.controller';
import { DepartmentModule } from '../department/department.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Card]), DepartmentModule, UserModule],
  controllers: [ CardController ],
  providers: [ CardService ],
})
export class CardModule {}