import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';

import { entityContext } from '@/src/entity.context';

@Module({
  imports: [TypeOrmModule.forRoot({
    keepConnectionAlive: true,
    type: "postgres",
    host: "192.168.99.100",
    port: 5432,
    username: "postgres",
    database: "module_user",
    entities: [...entityContext.keys().map(id => {
      const entityModule = entityContext(id);
      const [entity] = Object.values(entityModule);
      return entity;
  })],
    synchronize: true
  }), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
