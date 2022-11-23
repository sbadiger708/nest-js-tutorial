import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(
    @Inject('APP_NAME')
    private readonly name: string,
    @Inject('MESSAGE')
    private readonly message: string
  ) {}
  getHello(): string {
    return 'Hello World! from ' + this.name + ' Message ' + this.message;
  }
}
