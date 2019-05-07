import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { CryptoUtil } from './utils/crypto.util';

@Module({
  imports: [TypeOrmModule.forRoot(), UserModule],
  providers: [AppService, CryptoUtil],
  controllers: [AppController],
})
export class AppModule {
}
