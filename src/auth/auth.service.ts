import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

import { JwtPayload, JwtReply } from '../interfaces/jwt.interface';

const { SECRET_KEY } = process.env
@Injectable()
export class AuthService {
    // TODO: 配置有效期
    async createToken(payload: JwtPayload): Promise<JwtReply> {
        const expiresIn = Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 30)
        const accessToken = jwt.sign({...payload, exp: expiresIn}, SECRET_KEY)
        return { accessToken, expiresIn }
    }

    async createSuperAdminToken(payload: { userId: string }): Promise<JwtReply> {
        const expiresIn = Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 1200)
        const accessToken = jwt.sign({...payload, role: 'admin', exp: expiresIn}, SECRET_KEY)
        return { accessToken, expiresIn }
    }
}