import { Module } from '@nestjs/common'
import { ElevenLabsService } from './elevenlabs.service'

@Module({
  imports: [],
  controllers: [],
  providers: [ElevenLabsService],
  exports: [ElevenLabsService],
})
export class ElevenlabsModule {}
