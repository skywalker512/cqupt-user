import { Controller, Inject } from '@nestjs/common';
import { UserService } from './user.service';
import { GrpcMethod } from '@nestjs/microservices';

@Controller('user')
export class UserController {
  constructor(
    @Inject(UserService) private readonly userService: UserService
  ) { }

  @GrpcMethod()
  async creatUser(payload: { data: any }){
    const { data } = payload
    const user = await this.userService.creatUser(data)
    return { code: 200, message: '用户创建成功', user }
  }

  @GrpcMethod()
  async login(payload: { data: any }) {
    const { data } = payload
    const { user, tokenInfo } = await this.userService.login(data)
    return { code: 200, message: '登录成功', user, tokenInfo }
  }

  @GrpcMethod()
  async findOneUser(payload: { data: any }){
    const { data } = payload
    const user = await this.userService.findOneUser(data)
    return { code: 200, message: '用户查询成功', user }
  }

  @GrpcMethod()
  async findAllUsers() {
    const users = await this.userService.findAllUsers()
    return { code: 200, message: '查询所有用户成功', users }
  }
}
