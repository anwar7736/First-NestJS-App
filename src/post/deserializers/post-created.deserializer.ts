import { Deserializer, IncomingEvent } from '@nestjs/microservices';

export class PostCreatedDeserializer implements Deserializer<any, IncomingEvent> {
  deserialize(value: any): IncomingEvent {
    return {
      pattern: 'post.created',
      data: value,
    };
  }
}
