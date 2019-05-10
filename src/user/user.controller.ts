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
  async register(payload: { mobile: string, password: string }): Promise<IResponseBase>{
    const result = await this.userService.register(payload.mobile, payload.password)
    return { code: 200, message: '用户注册成功', result }
  }

  @GrpcMethod()
  async findOneUser(payload: { mobile: string, type: string }): Promise<IResponseBase>{
    const result = await this.userService.findOneUser(payload.type, payload)
    return { code: 200, message: '用户查询成功', result }
  }

  @GrpcMethod()
  async findAllUsers(): Promise<IResponseBase> {
    const result = await this.userService.findAllUsers()
    return { code: 200, message: '查询所有用户成功', result }
  }

  @GrpcMethod()
  async login(payload: { mobile: string, password: string }): Promise<IResponseBase> {
    const result = await this.userService.login(payload.mobile, payload.password)
    return { code: 200, message: '登录成功', result }
  }
}
