import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Card } from './card.entity';
import { Repository } from 'typeorm';
import { Department } from '../department/department.entity';
import { cqupt_user } from '../grpc/generated';
import { GrpcClientFactory } from '../grpc/grpc.client-factory';

@Injectable()
export class CardService {
  onModuleInit() {
    this.userService = this.grpcClientFactory.userModuleClient.getService('UserController');
  }

  constructor(
    @InjectRepository(Card) private readonly cardRepo: Repository<Card>,
    @Inject(GrpcClientFactory) private readonly grpcClientFactory: GrpcClientFactory
  ) {}
  private userService: cqupt_user.UserController

  async creatCard(stuNum: string, name: string, department: Department, stuId?: number, userId?: string) {
    let input = stuId ? { stuId } : {}
    if (userId) {
      this.userService.findOneUser({  })
    }

    const card = await this.cardRepo.save(this.cardRepo.create({ ...input, stuNum, name, department }))
    return card
  }

  // async findOneCard(stuNum: string, name: string, stuId: number)
}
