import { Controller, Inject } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { GrpcMethod } from '@nestjs/microservices';

@Controller('department')
export class DepartmentController {
  constructor (
    @Inject(DepartmentService) private readonly departmentService: DepartmentService
  ) {}

  @GrpcMethod()
  async creatDepartment(payload: {name: string}) {
    const { name } = payload
    const department = await this.departmentService.creatDepartment(name)
    return { code: 200, message: '学院创建成功', department }
  }

  @GrpcMethod()
  async findAllDepartments() {
    const departments = await this.departmentService.findAllDepartments()
    return { code: 200, message: '所有学院查询成功', departments }
  }
}
