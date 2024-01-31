import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ReplicateModule } from './replicate/replicate.module'
import { ElevenlabsModule } from './elevenlabs'

@Module({
  imports: [ReplicateModule, ElevenlabsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
