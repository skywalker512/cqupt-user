import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

import { JwtPayload, JwtReply } from '../interfaces/jwt.interface';

@Injectable()
export class AuthService {

    // TODO: 配置有效期
    async createToken(payload: JwtPayload): Promise<JwtReply> {
        const expiresIn = Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 30)
        const accessToken = jwt.sign({...payload, exp: expiresIn}, 'secretKey')
        return { accessToken, expiresIn }
    }
}