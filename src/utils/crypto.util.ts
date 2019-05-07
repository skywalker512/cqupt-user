import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcryptjs';

@Injectable()
export class CryptoUtil {
  /**
   * 用户密码加密
   * @param password 用户密码 明文
   */
  async encryptPassword(password: string): Promise<string> {
    return bcrypt.hash(password, bcrypt.genSaltSync());
  }

  /**
   * 用户密码比较
   * @param password 用户密码明文
   * @param passwordHash 用户密码 hash
   */
  async checkPassword(password: string, passwordHash: string): Promise<boolean> {
    return bcrypt.compare(password, passwordHash);
  }
}