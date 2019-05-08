import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: '0.0.0.0' + ':50053',
    package: 'cqupt_user',
    protoPath: join(__dirname, './user/user.proto'),
    loader: {
      arrays: true
    }
  },
}