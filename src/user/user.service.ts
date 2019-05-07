import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserInput } from './user.interface';
import { RpcException } from '@nestjs/microservices';
import { CryptoUtil } from '../utils/crypto.util';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @Inject(CryptoUtil) private readonly cryptoUtil: CryptoUtil,
  ) {}

  /**
   * 创建用户
   * @param createUserInput 创建用户时输入信息
   */
  async creatUser(createUserInput: CreateUserInput) {
    if (!(createUserInput.mobile || createUserInput.password)){
      throw new RpcException({ code: 406, message: ('请确保用户信息正确') })
    }

    if (createUserInput.password) {
      createUserInput.password = await this.cryptoUtil.encryptPassword(createUserInput.password)
    }
  }
}
