import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserInput } from './user.interface';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async creatUser(createUserInput: CreateUserInput) {
    if (!(createUserInput.mobile || createUserInput.password))
      throw new RpcException({ code: 406, message: ('请确保用户信息正确') })
  }
}
