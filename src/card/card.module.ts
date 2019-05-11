import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { Card } from './card.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Card])],
  controllers: [ CardService ],
})
export class CardModule {}