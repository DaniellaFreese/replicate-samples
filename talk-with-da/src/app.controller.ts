import { Body, Controller, Get, Logger, LoggerService, Optional, Post } from '@nestjs/common'
import { AppService } from './app.service'
import { ReplicateService } from './replicate'
import { Prompt } from './replicate/dto/replicate.dto'
import { ElevenLabsService } from './elevenlabs'

@Controller('speak')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly replicateService: ReplicateService,
    private readonly elevenlabsService: ElevenLabsService,
    @Optional()
    private readonly logger: LoggerService = new Logger(AppController.name)
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello()
  }

  @Post('/askDavid')
  async askDavid(@Body() request: Prompt) {
    this.logger.log(`request is ${JSON.stringify(request)}`)
    const response = await this.replicateService.askQuestion(request.prompt)
    this.elevenlabsService.textToSpeech(response)
  }
}
