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
  async register(mobile: string, password: string) {

    if (!(mobile || password)) {
      throw new RpcException({ code: 406, message: ('请确保用户信息正确') })
    }

    if (await this.userRepo.findOne({ where: { mobile } })) {
      throw new RpcException({ code: 409, message: '电话号码存在' });
    }

    if (password) {
      password = await this.cryptoUtil.encryptPassword(password)
    }
    const user = await this.userRepo.save(this.userRepo.create({ mobile, password }))
    const tokenInfo = await this.authService.createToken({ mobile: user.mobile });
    return [{ tokenInfo, user }]
  }
  /**
   * 查找所有用户
   */
  async findAllUsers() {
    const users = await this.userRepo.find()
    return users
  }

  /**
  * 用户登录
  *
  * @param mobile 电话
  * @param password 密码
  */
  async login(mobile: string, password: string) {
    const user = await this.userRepo.createQueryBuilder('user')
      .where('user.mobile = :mobile', { mobile })
      // .orWhere('user.email = :email', { email: email.toLocaleLowerCase() })
      .getOne()

    if (!user) throw new RpcException({ code: 404, message: '用户不存在' })
    if (!await this.cryptoUtil.checkPassword(password, user.password)) {
      throw new RpcException({ code: 406, message: '密码错误' });
    }

    const tokenInfo = await this.authService.createToken({ mobile });
    return [{ tokenInfo, user }]
  }
}
