import { Logger, Optional, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import Replicate from 'replicate';

@Injectable()
export class ReplicateService implements OnApplicationBootstrap{
  
  private replicateClient: Replicate
  model: 'meta/llama-2-70b-chat:02e509c789964a7ea8736978a43525956ef40397be9033abf9fd2badfe68c9e3'

  constructor(
    @Optional()
    private readonly logger = new Logger(ReplicateService.name)
  ){}

  onApplicationBootstrap() {
    const auth = process.env.REPLICATE_API_TOKEN
    if (!auth) {
      throw new Error('Replicate API Token not found')
    }

    try {
      this.replicateClient = new Replicate({ auth })
    }catch(e){
      this.logger.error(e)
      throw new Error('Replicate client failed to initialize')
    }
    this.logger.log('Replicate client initialized')
  }

  public async getPrompt(prompt: string): Promise<string> {

    let output 
    try {
      output = await this.replicateClient.run(
        'meta/llama-2-70b-chat:02e509c789964a7ea8736978a43525956ef40397be9033abf9fd2badfe68c9e3',
        {
          input: {
            debug: false,
            top_k: 50,
            top_p: 1,
            prompt: prompt,
            temperature: 0.5,
            system_prompt:
              "You are a helpful, respectful and honest assistant. Always answer as helpfully as possible, while being safe. Your answers should not include any harmful, unethical, racist, sexist, toxic, dangerous, or illegal content. Please ensure that your responses are socially unbiased and positive in nature.\n\nIf a question does not make any sense, or is not factually coherent, explain why instead of answering something not correct. If you don't know the answer to a question, please don't share false information.",
            max_new_tokens: 100,
            min_new_tokens: -1,
          },
        }
      ) 
    }catch(e){
      this.logger.error(`Replicate client failed to run ${e?.msg}`, e?.stack)
      throw new Error('Replicate client failed to run')
    }
    
    const response: string = output.join('')
    return response
  }
}