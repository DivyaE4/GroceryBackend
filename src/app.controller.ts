import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

export interface ItemInterface {
  Item: string;
  Price: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('getAllItems')
  getAllItems() {
    return this.appService.getAllItems();
  }

  @Post('/createItem')
  createItem(@Body() body) {
    console.log(body);
    return this.appService.createItem(body);
  }
  @Post('/cartItems')
  cartItems(@Body() body) {
    console.log(body);
    return this.appService.cartItems(body);
  }
}
