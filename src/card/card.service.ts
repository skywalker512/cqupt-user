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

  async creatCard(stuNum: string, name: string, departmentId: string, userId?: string, stuId?: string) {
    // 手动输入的时候没有 stuId
    let input:any = stuId ? { stuId } : {}
    // 添加别人添加卡片的时候没有用户的 ID
    if (userId) {
      const user = await this.userService.findOneUser({ id: userId })
      input = { ...input, user }
    }
    const department = await this.departmentService.findDepartment(departmentId)
    const isHaveCard = await this.cardRepo.findOne({where: { stuNum }, relations: ['user']})
    let card: any;
    if (isHaveCard) {
      // 有人拾到卡片已经添加好了 没有用户信息 进行用户信息绑定
      if( !isHaveCard.user ) {
        isHaveCard.user = input.user
        card = await this.cardRepo.save(isHaveCard)
      } else {
        // 有用户信息 card 不能继续添加
        throw new RpcException({ code: 4001, message: '卡片已经存在' })
      }
    } else {
      card = await this.cardRepo.save(this.cardRepo.create({ ...input, stuNum, name, department }))
      card.department = department
    }
    return card
  }

  async findOneCard(data: any, relations: string[] = ['department'] ) {
    const type = Object.keys(data)[0]
    let card: Card
    if (type === 'user') {
      card = await this.cardRepo.createQueryBuilder('card')
        .leftJoin('card.user', 'user')
        .leftJoinAndSelect('card.department', 'department')
        .where('user.id = :userId', { userId: data[type] })
        .getOne()
    } else {
      card = await this.cardRepo.findOne({ where: { [type]: data[type] }, relations })
    }
    if (!card) throw new RpcException({ code: 404, message: '卡片不存在' })
    return card
  }
}
