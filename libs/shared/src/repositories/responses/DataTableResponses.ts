import { BaseResponses } from './BaseResponses';

export class DataTableResponses<T> extends BaseResponses<T> {
  count: number;

  constructor(success: boolean, message: string, data: T, count: number) {
    super(success, message, data);
    this.count = count;
  }
}
