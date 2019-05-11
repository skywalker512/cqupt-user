import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { RpcException } from '@nestjs/microservices';
import { CryptoUtil } from '../utils/crypto.util';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @Inject(CryptoUtil) private readonly cryptoUtil: CryptoUtil,
    @Inject(forwardRef(() => AuthService)) private readonly authService: AuthService,
  ) { }

  /**
   * 创建用户
   * @param 创建用户时输入信息
   */
  async creatUser(type: string, data: any) {
    if (await this.userRepo.findOne({ where: { [type]: data[type]  } })) {
      throw new RpcException({ code: 409, message: '你的信息已存在' });
    }
    const user = await this.userRepo.save(this.userRepo.create({ [type]: data[type] }))
    const tokenInfo = await this.authService.createToken({ userId: user.id });
    return { tokenInfo, user }
  }
  /**
   * 查找所有用户
   */
  async findAllUsers() {
    const users = await this.userRepo.find()
    return users
  }

  async findOneUser(type: string, data: any) {
    const user = await this.userRepo.findOne({ where: { [type]: data[type] } })
    if (!user) throw new RpcException({ code: 404, message: '用户不存在' })
    return user
  }

  /**
  * 用户登录
  *
  * @param mobile 电话
  * @param password 密码
  */
  async login(type: string, data: any) {
    const user = await this.userRepo.findOne({ where: { [type]: data[type] } })
    if (!user) throw new RpcException({ code: 404, message: '用户不存在' })
    const tokenInfo = await this.authService.createToken({ userId: user.id });
    return { tokenInfo, user }
  }
}
