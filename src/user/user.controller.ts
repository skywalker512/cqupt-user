import { Controller, Inject } from '@nestjs/common';
import { UserService } from './user.service';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateUserInput } from './user.interface';
import { IResponseBase } from '../interfaces/dataResponse.interface';

@Controller('user')
export class UserController {
  constructor(
    @Inject(UserService) private readonly userService: UserService
  ) { }

  @GrpcMethod()
  async createUser(payload: { createUserInput: CreateUserInput }): Promise<IResponseBase>{
    await this.userService.creatUser(payload.createUserInput)
    return { code: 300, message: '创建用户成功' }
  }

  @GrpcMethod()
  async findAllUsers(): Promise<IResponseBase> {
    const result = await this.userService.findAllUsers()
    return { code: 200, message: '查询所有用户成功', result }
  }
}
