import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReplicateModule } from './replicate/replicate.module';

@Module({
  imports: [ReplicateModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
