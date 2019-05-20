import { Controller, Get } from '@nestjs/common';
import { AppService } from '../services';

/**
 * Basic application controller that integrates the appService
 */

@Controller()
export class AppController {
  private readonly appService: AppService;

  public constructor(appService: AppService) {
    this.appService = appService;
  }

  @Get()
  public getHello(): string {
    return this.appService.getHello();
  }
}
