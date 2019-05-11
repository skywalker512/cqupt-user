import { Controller, Inject } from '@nestjs/common';
import { UserService } from './user.service';
import { GrpcMethod } from '@nestjs/microservices';
import { IResponseBase } from '../interfaces/dataResponse.interface';

@Controller('user')
export class UserController {
  constructor(
    @Inject(UserService) private readonly userService: UserService
  ) { }

  @GrpcMethod()
  async creatUser(payload: { type: string, data: any }): Promise<IResponseBase>{
    const { type, data } = payload
    const { user, tokenInfo } = await this.userService.creatUser(type, data)
    return { code: 200, message: '用户创建成功', user, tokenInfo }
  }

  @GrpcMethod()
  async login(payload: { type: string, data: any }): Promise<IResponseBase> {
    const { type, data } = payload
    const { user, tokenInfo } = await this.userService.login(type, data)
    return { code: 200, message: '登录成功', user, tokenInfo }
  }

  @GrpcMethod()
  async findOneUser(payload: { type: string, data: any }): Promise<IResponseBase>{
    const { type, data } = payload
    const user = await this.userService.findOneUser(type, data)
    return { code: 200, message: '用户查询成功', user }
  }

  @GrpcMethod()
  async findAllUsers(): Promise<IResponseBase> {
    const users = await this.userService.findAllUsers()
    return { code: 200, message: '查询所有用户成功', users }
  }
}
