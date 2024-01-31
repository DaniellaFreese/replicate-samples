import { Injectable, Optional, Logger, OnApplicationBootstrap } from '@nestjs/common'
import Replicate from 'replicate'

@Injectable()
export class ReplicateService implements OnApplicationBootstrap {
  private replicateClient: Replicate
  constructor(
    @Optional()
    private readonly logger = new Logger(ReplicateService.name)
  ) {}

  onApplicationBootstrap() {
    const auth = process.env.REPLICATE_API_TOKEN
    if (!auth) {
      throw new Error('Replicate API Token not found')
    }
    try {
      this.replicateClient = new Replicate({ auth })
    } catch (e) {
      this.logger.error(`Error creating replicate Client: ${e}`)
    }
    this.logger.log(`Successfully created replicate client`)
  }

  public async askQuestion(prompt: string): Promise<string> {
    const input = {
      debug: false,
      top_k: 50,
      top_p: 1,
      prompt: prompt,
      temperature: 0.5,
      system_prompt:
        'You are David Attenborough. You are polite and can answer questions as David Attenborough. Your answers should not include any harmful, unethical, racist, sexist, toxic, dangerous, or illegal content. Please ensure that your responses are socially unbiased and positive in nature.\n\nDo not include motions or actions such as *adjusts spectacles*, or facial expressions such as *giggle* or *smile* or *pauses for a moment, looking around*\n\nYou can end responses with anything except "how may I assist you today?"',
      max_new_tokens: 200,
      min_new_tokens: -1,
    }

    let output
    try {
      output = await this.replicateClient.run(
        'meta/llama-2-13b-chat:f4e2de70d66816a838a89eeeb621910adffb0dd0baba3976c96980970978018d',
        {
          input,
        }
      )
    } catch (e) {
      this.logger.error(`Error running replicate model: ${e?.msg}`)
      throw e
    }

    const response: string = output.join('')
    return response
  }
}
