import { Controller, Inject } from '@nestjs/common';
import { CardService } from './card.service';
import { GrpcMethod } from '@nestjs/microservices';

@Controller('card')
export class CardController {
  constructor (
    @Inject(CardService) private readonly cardService: CardService,
  ) {}

  @GrpcMethod()
  async creatCard(payload: {stuNum: string, name: string, departmentId: string, stuId?: string, userId?: string}) {
    const { stuNum, name, departmentId, stuId, userId } = payload
    const card = await this.cardService.creatCard(stuNum, name, departmentId, userId, stuId)
    return { code: 200, message: '创建卡片成功', card }
  }

  @GrpcMethod()
  async findOneCard(payload: { stuNum?: string, stuId?: string, name?: string, userId?: string}) {
    let data: any
    if(Object.keys(payload).includes('userId')) {
      data = { user: payload.userId }
    } else {
      data = payload
    }
    const card = await this.cardService.findOneCard(data)
    return { code: 200, message: '卡片查询成功', card }
  }
}
