import { Injectable, Logger, LoggerService, OnApplicationBootstrap, Optional } from '@nestjs/common'
import axios, { AxiosInstance } from 'axios'
import fs from 'fs'

@Injectable()
export class ElevenLabsService implements OnApplicationBootstrap {
  private axios: AxiosInstance
  constructor(
    @Optional()
    private readonly logger: LoggerService = new Logger(ElevenLabsService.name)
  ) {}

  onApplicationBootstrap() {
    const token = process.env.ELEVENLABS_API_TOKEN
    if (!token) {
      throw new Error('Elevenlabs API Token not found')
    }

    this.axios = axios.create({
      baseURL: 'https://api.elevenlabs.io/v1',
      headers: { 'xi-api-key': token },
    })
  }

  public async textToSpeech(text: string) {
    const writer = fs.createWriteStream('davidResponse.mp3')

    this.axios({
      method: 'post',
      url: '/text-to-speech/v54nYLEeOCiGp6Ryz05b/stream',
      responseType: 'stream',
      data: {
        text: text,
      },
    }).then((response) => {
      response.data.pipe(writer)
    })
    this.logger.log('textToSpeech complete')
  }
}
