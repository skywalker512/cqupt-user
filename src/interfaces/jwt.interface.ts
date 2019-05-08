export interface JwtPayload {
  mobile: string;
  options?: any;
}

export interface JwtReply {
  accessToken: string;
  expiresIn: number;
}