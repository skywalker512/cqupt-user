import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from './department.entity';
import { Repository } from 'typeorm';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department) private readonly departmentRepo: Repository<Department>
  ) {}

  async creatDepartment(name: string) {
    if (await this.departmentRepo.findOne({ where: { name } })) {
      throw new RpcException({ code: 409, message: '学院已存在' });
    }
    const department = await this.departmentRepo.save(this.departmentRepo.create({ name }))
    return department
  }

  async findAllDepartments() {
    const departments = await this.departmentRepo.find()
    return departments
  }
}
