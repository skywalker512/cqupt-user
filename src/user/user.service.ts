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
   * @param data 创建用户时输入信息
   */
  async creatUser(data: User) {
    const type = Object.keys(data)[0]
    if (await this.userRepo.findOne({ where: data })) {
      throw new RpcException({ code: 409, message: '你的信息已存在' });
    }
    const user = await this.userRepo.save(this.userRepo.create({ [type]: data[type] }))
    return user
  }
  /**
   * 查找所有用户
   */
  async findAllUsers() {
    const users = await this.userRepo.find()
    return users
  }

  async findOneUser(data: any) {
    const type = Object.keys(data)[0]
    const user = await this.userRepo.findOne({ where: { [type]: data[type] } })
    if (!user) throw new RpcException({ code: 404, message: '用户不存在' })
    return user
  }

  /**
   * 用户登录
   * @param data 用户信息
   */
  async login(data: any) {
    const isHave = await this.userRepo.findOne({ where: data })
    let user: User
    if (!isHave) {
      user = await this.creatUser(data)
    }
    const type = Object.keys(data)[0]
    user = await this.userRepo.createQueryBuilder('user')
      .where(`user.${type} = :${type}`, { [type]: data[type] })
      .getOne()
    const tokenInfo = await this.authService.createToken({ userId: user.id })
    return { tokenInfo, user }
  }
}
