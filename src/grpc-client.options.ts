import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'cqupt_user',
    protoPath: join(__dirname, './user/user.proto'),
  },
}