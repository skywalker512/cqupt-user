import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Card } from './card.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { RpcException } from '@nestjs/microservices';
import { DepartmentService } from '../department/department.service';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card) private readonly cardRepo: Repository<Card>,
    @Inject(UserService) private readonly userService: UserService,
    @Inject(DepartmentService) private readonly departmentService: DepartmentService,
  ) {}

  async creatCard(stuNum: string, name: string, departmentId: string, stuId?: number, userId?: string) {
    let input:any = stuId ? { stuId } : {}
    if (userId) {
      const user = await this.userService.findOneUser('id', { id: userId })
      input = { ...input, user }
    }
    const department = await this.departmentService.findDepartment(departmentId)
    const card = await this.cardRepo.save(this.cardRepo.create({ ...input, stuNum, name, department }))
    return card
  }

  async findOneCard(type: string, data: any ) {
    const card = await this.cardRepo.findOne({ where: { [type]: data[type] } })
    if (!card) throw new RpcException({ code: 404, message: '卡片不存在' })
    return card
  }
}
