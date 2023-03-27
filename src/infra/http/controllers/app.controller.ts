import { Controller, Get } from '@nestjs/common';

@Controller('app')
export class AppController {
  @Get()
  async helloWorld() {
    return {
      message: 'Hello World',
    };
  }
}
