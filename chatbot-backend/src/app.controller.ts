import { Logger, Controller, Get, Post, Body, Optional } from '@nestjs/common';
import { AppService } from './app.service';
import { Prompt } from './replicate/dto/replicate.dto';
import { ReplicateService } from './replicate/replicate.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Optional()
    private readonly logger = new Logger(AppController.name),
    private readonly replicateService: ReplicateService,
    ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/replicate')
  async getReplicatePrompt(@Body() request: Prompt) {
    this.logger.log(`request is ${JSON.stringify(request)}`)

    const response = await this.replicateService.getPrompt(request.prompt)
 
    return response
  }
}
