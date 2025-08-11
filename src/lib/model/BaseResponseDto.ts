export interface BaseResponseDto<T> {
  statusCode: string;
  resultMessage: string;
  result: T;
}
