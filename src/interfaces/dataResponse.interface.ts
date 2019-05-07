export type TMessage = string;

export interface IResponseBase {
  code: number
  message: TMessage
  [propName: string]: any
}