export class ErrorCapture extends Error {
  constructor(message: string, private code: number = 400) {
    super(message);
  }
  
  set statusCode(code: number) {
    this.code = code;
  }

  get statusCode(): number {
    return this.code;
  }

  get message(): string {
    return super.message;
  }
};