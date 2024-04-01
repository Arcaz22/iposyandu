import { Injectable } from '@nestjs/common';

@Injectable()
export class BayiService {
  getPresence(): string {
    return 'Hello World!';
  }
}
